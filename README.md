# Open Summer of Code selection tool

This is an experimental API branch, which is transitioning out Firebase in favor of a TypeScript GraphQL API.


## Prerequisites

- Node v14 with npm 7 installed
- [Docker](https://docs.docker.com/get-docker/)
- You must be added to either the osoc selection tool [Firebase](https://firebase.google.com/) instance, or create your own.
If you create your own, replace `firebaseConfig` in  `src/firebase.js` with your own values. The [data transformer and import scripts](https://github.com/opensummerofcode/selections-data-transformer) can help you transform your data into a format the tool expects. Your Firebase instance must have Google authentication enabled, and you must deploy firebase functions for user creation to work: `firebase deploy --only functions`
- On first sign-in as the first user, you will manually have to set yourself to `admin` in the `users` collection through a script or the Firebase console.

### Install dependencies

This project uses [npm 7's workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces). All dependencies are hoisted to the top-level node_modules. The `common` folder contains code shared between both the client and server, and can be imported from as if it were a published npm package.

Run `npm install` in the project directory to install dependencies.

## Running the project

In the project directory, you can run:

### `docker-compose up`

Will start a Postgres database for the server to connect to. Use `docker-compose up -d` to run in detached mode.

### `npm run client:dev`

Runs the Next React app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run server:dev`

Runs the server in development mode. This depends on a Postgres database to be available, you'll want to run the docker container to set up Postgres.

You can access a graphql playground on [http://localhost:4000/graphql](http://localhost:4000/graphql).

### `npm run prisma:generate` & `npm run prisma:migrate`

Every time you add something to `server/prisma/schema.prisma`, you'll have to regenerate the Prisma client types. You can do so with `npm run prisma:generate`.

If you change existing types, run migrations with `npm run prisma:migrate`.
