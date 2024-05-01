# Storytime Frontend

This is a front-end React application for the Storytime demo, an AI-powered interactive transmedia storytelling experience. The Storytime demo has two parts. The back-end portion of the application can be [found on GitHub](https://github.com/UnidentifiedContributor/storytime-backend). It is responsible for hosting the WebSocket server that streams messages between the AI integration and the client.

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

We've deployed the [live demo](https://story.akasha.live/) version on Vercel at [story.akasha.live](https://story.akasha.live/). You will need to sign in via OAuth2 with a Discord account to access the demo, due to the risk of spam. This is a secure process, and the app receives the minimum scope necessary for authentication. You must provide your own [Discord API](#api-keys) credentials for development and deployment.

## Requirements

1. Node.js 21 or later, v21.7.1 used for development — older versions may work, but are untested
1. Cloud provider for production deployments

## Development

To get started with a local version of the Storytime frontent, follow these steps:

1. Clone this repository to a local directory of your choice
1. Navigate to the root of the project directory in the terminal emulator of your choice
1. Make a copy of `.env.example` -> `.env.local` and update it with the [required API keys](#api-keys)
1. Run the `npm install` command to install the required application dependencies
1. Run the `npm run dev` command to start the Next.js development server
1. Navigate to (default) [http://127.0.0.1:3000/](http://127.0.0/1:3000) with the browser of your choice

## Deployment

The easiest way to deploy the Storytime front-end is as a serverless app on [Netlify](https://netlify.com/) or [Vercel](https://vercel.com/).

### API Keys

The Storytime front-end application makes use of [Discord](https://discord.com) as an [OAuth2](https://oauth.net/2/) provider for secure sign in without requiring the user to sign up. To run your own instance of this application, you need to create your own application on the [Discord developer platform](https://discord.com/developers/applications).

For this integration, we use the following environment variables:

1. `DISCORD_CLIENT_ID`
1. `DISCORD_CLIENT_SECRET`

### OAuth2 Redirects

Due to security provisions in the OAuth2 protocol, you will need to provide Discord with a list of legitimate `callback` URI for this application to function properly. Take a look at the **OAuth2** tab of the [Discord developer console](https://discord.com/developers/applications) for your application. You will see a **Redirects** section where you can provide the list of URLs. If you have trouble finding it, go to `https://discord.com/developers/applications/<DISCORD_CLIENT_ID>/oauth2` with the browser of your choice.

For local development and testing, you must provide: `http://localhost:3000/api/auth/callback/discord`

For production deployment, you may provide an additional URL with `localhost:3000` replaced by your production host
