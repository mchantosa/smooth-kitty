// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { Plugin } from "$fresh/server.ts";
import {
  createGitHubOAuthConfig,
  createGoogleOAuthConfig,
  createFacebookOAuthConfig,
  handleCallback,
  signIn,
  signOut,
} from "kv_oauth";
import {
  createUser,
  deleteUserBySession,
  getUser,
  newUserProps,
  updateUser,
  type User,
} from "@/utils/db.ts";
import { isStripeEnabled, stripe } from "@/utils/stripe.ts";

/**
 * 
 * curl -i -X GET \
 * "https://graph.facebook.com/v18.0/me?fields=id%2Cname&access_token="
 */

const githubOAuthClient = createGitHubOAuthConfig();
const googleOAuthClient = createGoogleOAuthConfig({
  redirectUri: "http://localhost:8000/google/callback",
  scope: "openid email profile",
});
const facebookOAuthClient = createFacebookOAuthConfig({
  redirectUri: "http://localhost:8000/facebook/callback",
  scope: "email",
});

// deno-lint-ignore no-explicit-any
async function getGitHubUser(accessToken: string): Promise<any> {
  const response = await fetch("https://api.github.com/user", {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }
  return await response.json();
}

async function getGoogleUser(accessToken: string): Promise<any> {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo",
    {
      headers: { authorization: `Bearer ${accessToken}` },
    },
  );
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }
  return await response.json();
}

async function getFacebookUser(accessToken: string): Promise<any> {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/me?fields=id%2Cname&access_token=${accessToken}`
  );
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }
  return await response.json();
}

/**
 * This custom plugin centralizes all authentication logic using the {@link https://deno.land/x/deno_kv_oauth|Deno KV OAuth} module.
 *
 * The implementation is based off Deno KV OAuth's own {@link https://deno.land/x/deno_kv_oauth/src/fresh_plugin.ts?source|Fresh plugin implementation}.
 */
export default {
  name: "kv-oauth",
  routes: [
    {
      path: "/facebook/signin",
      handler: async (req) => await signIn(req, facebookOAuthClient),
    },
    {
      path: "/facebook/callback",
      handler: async (req) => {
        const { response, tokens, sessionId } = await handleCallback(
          req,
          facebookOAuthClient,
        );

        const facebookUser = await getFacebookUser(tokens.accessToken);

        const user = await getUser(facebookUser.email);

        if (!user) {
          const user: User = {
            provider: "facebook",
            login: facebookUser.email,
            sessionId,
            firstName: facebookUser.given_name,
            lastName: facebookUser.family_name,
            profilePictureUrl: facebookUser.picture,
            ...newUserProps(),
          };
          await createUser(user);
        } else {
          await deleteUserBySession(sessionId);
          await updateUser({ ...user, sessionId });
        }
        return response;
      },
    },
    {
      path: "/google/signin",
      handler: async (req) => await signIn(req, googleOAuthClient),
    },
    {
      path: "/google/callback",
      handler: async (req) => {
        const { response, tokens, sessionId } = await handleCallback(
          req,
          googleOAuthClient,
        );

        const googleUser = await getGoogleUser(tokens.accessToken);

        const user = await getUser(googleUser.email);

        if (!user) {
          const user: User = {
            provider: "google",
            login: googleUser.email,
            sessionId,
            firstName: googleUser.given_name,
            lastName: googleUser.family_name,
            profilePictureUrl: googleUser.picture,
            ...newUserProps(),
          };
          await createUser(user);
        } else {
          await deleteUserBySession(sessionId);
          await updateUser({ ...user, sessionId });
        }
        return response;
      },
    },
    {
      path: "/github/signin",
      handler: async (req) => await signIn(req, githubOAuthClient),
    },
    {
      path: "/github/callback",
      handler: async (req) => {
        const { response, tokens, sessionId } = await handleCallback(
          req,
          githubOAuthClient,
        );

        const githubUser = await getGitHubUser(tokens.accessToken);

        const user = await getUser(githubUser.login);
        if (!user) {
          let stripeCustomerId = undefined;
          if (isStripeEnabled()) {
            const customer = await stripe.customers.create({
              email: githubUser.email,
            });
            stripeCustomerId = customer.id;
          }
          const user: User = {
            provider: "github",
            login: githubUser.login,
            stripeCustomerId,
            sessionId,
            ...newUserProps(),
          };
          await createUser(user);
        } else {
          await deleteUserBySession(sessionId);
          await updateUser({ ...user, sessionId });
        }
        return response;
      },
    },
    {
      path: "/signout",
      handler: signOut,
    },
  ],
} as Plugin;
