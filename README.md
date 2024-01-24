# InnerCircle PRM (Personal Relation Manager)

## Overview
Welcome to my [InnerCircle](http://innercircleprm.com) project! [InnerCircle](http://innercircleprm.com) was created to help you stay connected to those you truly care about. This is designed to be a medium agnostic, non-calendered, warm and user friendly, communication asset, intended to support a small to medium set of contacts. 

## Features

- **Contact List:** Keep contact information.
- **Dashboard:** Manage contact cadance.
- **Search Functionality:** Quickly find the contact you're looking for.

## Coming Soon
- **Birthday Integration:** Get birthday reminders in advance so you have time to plan a little something.
- **Notes:** Be able to keep notes on how your contact was doing, or things to check up on in the future.
- **Facebook Oauth:** In the process of configuring developer credentials.

## Architecture
* **Runtime:** Deno
* **Framework:** Fresh Framework (TypeScript + Preact)
* **Database:** Deno-KV (NoSQL)
* **CSS:** Tailwind and DaisyUI

## Running a local server
1. [Install Deno run time](https://docs.deno.com/runtime/manual/getting_started/installation)
1. Clone this repo: This will result in a smooth-kitty directory
   
   This is Shiva, she is my forever cat

   ![Alt text](/static/images/myCat.jpg)
1. Set up environmental variables
   I created this application to track user sessions with Oauth. That makes this part complicated. Currently it is configured to support github, Google, and Facebook Oauth. For this repository to run, you must have Oauth developer credentials. 
   
   Create a .env file in smooth-kitty and add this code. This will enable you to "start" the application and go to any unsecure page, but it will crash as soon as you attempt to log in. 

   To make this application work, you need to have one set of valid credentials with which to Oauth. 

   * [Github](https://github.com/settings/developers): The easiest

   * [Google](https://console.cloud.google.com/): Not very difficult

   * [Facebook](https://developers.facebook.com/apps): I started the process and FB cut me the keys but told me it would take 10 days to support me, and I failed to follow through with the setup. It's on the list.
   
   ```bash
      GITHUB_CLIENT_ID=myVeryLongGithubClientId
      GITHUB_CLIENT_SECRET=myExcitingGithubSecret

      GOOGLE_CLIENT_ID=myVeryLongGoogleClientId
      GOOGLE_CLIENT_SECRET=myExcitingGoogleSecret

      FACEBOOK_CLIENT_ID=myVeryLongFacebookClientId
      FACEBOOK_CLIENT_SECRET=myExcitingFacebookSecret

      #This needs to be the development domain name for the app as registered with the Oauth provider
      DOMAIN=http://localhost:8000
   ```
1. In smooth-kitty directory run `deno task start`

## Accessing the database

## Testing