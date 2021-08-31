# Device Dashboard

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Using with Data

**Everything you will want to do with this app will require a server for data.**

Clone the [server component](https://github.com/NinjaRMM/devicesTask_serverApp) and run it locally. Make sure port 3000 is available. Once the server is running, run this app in development (`yarn start`) or serve the development build (create with `yarn build`).

```shell
> git clone git@github.com:NinjaRMM/devicesTask_serverApp.git
> cd devicesTask_serverApp && yarn install
> yarn start
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console. Don't forget to run the server.

### `yarn test`

Runs a Cypress test suite on the application. **The server must be running and without any data modification.** Because of this, the test is rather brittle since the state isn't reset on each permutation.

### `yarn cy:open` (Recommended)

Launches the interaction Cypress test runner.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
