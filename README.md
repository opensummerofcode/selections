# Open Summer of Code selection tool

## Prerequisites

- Node v10 installed
- This project uses [Yarn](yarnpkg.org) (quick install: `npm install -g yarn`)
- You must be added to either the osoc selection tool [Firebase](https://firebase.google.com/) instance, or create your own.
If you create your own, replace `firebaseConfig` in  `src/firebase.js` with your own values. The [data transformer and import scripts](https://github.com/opensummerofcode/selections-data-transformer) can help you transform your data into a format the tool expects.

### Install dependencies

Run `yarn` in the project directory to install dependencies.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
