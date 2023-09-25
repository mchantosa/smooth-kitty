// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { ComponentChildren } from "preact";
import type { RouteContext } from "$fresh/server.ts";
import type { State } from "@/middleware/session.ts";
import Head from "@/components/Head.tsx";
import { nanoid } from "https://deno.land/x/nanoid/mod.ts";

const sections = [
  {
    title: "Medium agnostic",
    content:
      "Much of how we communicate now is determined by the communication mediums we share. Quitting Facebook is like changing your phone number. Is a friend any less a friend because you grew disenchanted with WhatsApp, or turned off with Twitter? This app organizes your communications around people, not communication mediums.",
  },
  {
    title: "Non-calendered",
    content:
      "What does your work-life balance calendar; look like? Meetings, dentist appointments, parent teacher conferences? Adding periodic communication fidelity to your work-life balance calendar risks making connecting with your nearest and dearest a stressful task whose alert will be swiped away and dismissed. This app provides you with a weekly objectives, and rolls uncompleted objectives into the following week.",
  },
  {
    title: "Warm and user friendly",
    content:
      "This app has no calender and no alerts, nor will it integrate with amy of your communication mediums. You get what you put into it. Carve out some time in your day, 15 min before bed, a cup of coffee in the morning, a lovely ferry ride on your commute home... Use this time to tender your list, and enjoy it. This is the pattern of behavior this application is intended to support.",
  },
  {
    title: "Small to medium set of contacts",
    content:
      'It is possible to have thousands of "friends" across a half-dozen applications and still be completely alone. Communication is not manifested through connectivity, it is manifested through behavior. This application is intended to help you evaluate how much communication you want to maintain and prioritize with whom you wish to maintain it.',
  },
];

interface SectionProps {
  children?: ComponentChildren;
  title: string;
  content: string;
}

const Section = ({ title, content }: SectionProps) => {
  return (
    <>
      <h2 class="text-2xl font-bold">{title}</h2>
      <p class="my-2 mb-6">{content}</p>
    </>
  );
};

// deno-lint-ignore require-await
export default async function HomePage(
  _req: Request,
  ctx: RouteContext<undefined, State>,
) {
  return (
    <>
      <Head href={ctx.url.href}>
        {
          /* <link
          as="fetch"
          crossOrigin="anonymous"
          href={endpoint}
          rel="preload"
        /> */
        }
      </Head>
      <main class="flex-1 p-4">
        <div class="hero min-h-screen bg-base-200">
          <div class="hero-content flex-col lg:flex-row">
            <div class="mr-6">
              <img
                src="/images/connections-logo.png"
                class="max-w-sm rounded-lg shadow-2xl mb-6"
              />
              <img
                src="/images/coffee_toast.jpg"
                class="max-w-sm rounded-lg shadow-2xl mb-6"
              />
              <img
                src="/images/coffee_desk.jpg"
                class="max-w-sm rounded-lg shadow-2xl"
              />
            </div>

            <div>
              <h1 class="text-4xl font-bold">Our Mission</h1>
              <p class="py-6">
                To help you stay connected to those you truly care about. This
                is designed to be a medium agnostic, non-calendered, warm and
                user friendly, communication asset, intended to support a small
                to medium set of contacts. So why use this manager?
              </p>
              {sections.map((section) => (
                <Section
                  key={nanoid()}
                  title={section.title}
                  content={section.content}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
