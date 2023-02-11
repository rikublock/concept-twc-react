# Proof of Concept (React + Trust Wallet Core)

> Tested on a Linux Ubuntu machine

The Trustwallet project recently added beta support for WASM (WebAssembly) to its wallet-core implementation.
- the implementation can be found on github: https://github.com/trustwallet/wallet-core
- the compiled `@trustwallet/wallet-core` npm package is available from: https://www.npmjs.com/package/@trustwallet/wallet-core

Based on the "create react app" tutorial found here: https://create-react-app.dev/docs/getting-started/

The goal is to quickly explore the support of the WASM Trustwallet core in react js apps (with webpack and babel). 

## Setup

Install dependencies.

```shell
yarn
```

## Run

Runs the app in the development mode (using webpack).
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

```shell
yarn serve
```

## Build

Builds the app for production to the `build/` folder.
See the section about [deployment](https://create-react-app.dev/docs/deployment/) for more information.

```shell
yarn build
```

Optionally, the build can be tested with nginx (in Docker).
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

```shell
./run_ngnix.sh
```

