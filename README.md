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
This project is running the Fresh Framework (TypeScript + Preact) on Deno, uses Deno-KV (NoSQL) as a datastore, and Tailwind and DaisyUI for CSS.

## Running a local server
1. [Install Deno run time](https://docs.deno.com/runtime/manual/getting_started/installation)
1. Clone this repo: This will result in a smooth-kitty directory
   
   This is Shiva, she is my forever cat

   ![Alt text](/static/images/myCat.jpg)
1. Set up environmental variables
   I created this application to track user sessions with Oauth. That makes this part complicated. Currently it is configured to support github, Google, and Facebook Oauth. For this repository to run, you must have Oauth developer credentials. 
   
   Create a .env file in smooth-kitty and add this code. This will enable you to "start" the application, but it will crash as soon as you attempt to log in. 
   
   ```bash
      GITHUB_CLIENT_ID=myverylonggithubclientid
      GITHUB_CLIENT_SECRET=myexcitinggithubsecret

      GOOGLE_CLIENT_ID=myverylonggoogleclientid
      GOOGLE_CLIENT_SECRET=myexcitinggooglesecret

      FACEBOOK_CLIENT_ID=myverylongfacebookclientid
      FACEBOOK_CLIENT_SECRET=myexcitingfacebooksecret

      #This needs to be the development domain name for the app as registered with the Oauth provider
      DOMAIN=http://localhost:8000
   ```
1. In smooth-kitty directory run `deno task start`