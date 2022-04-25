# Flashbots Ethers Example

This project shows how to use Ethers to interact with Flashbots from JavaScript/TypeScript. The examples can be run in Node.js and the browser.

References:

* https://github.com/ethers-io/ethers.js
* https://github.com/flashbots/ethers-provider-flashbots-bundle

## Project structure

* There's four iterative examples in [`src/main1.ts`](https://github.com/metachris/flashbots-ethers-example/blob/master/src/main1.ts) (Ethers setup) to [`src/main4.ts`](https://github.com/metachris/flashbots-ethers-example/blob/master/src/main4.ts) (sending bundles and more).
* They are imported from [`src/cli.ts`](https://github.com/metachris/flashbots-ethers-example/blob/master/src/cli.ts) and [`src/browser.ts`](https://github.com/metachris/flashbots-ethers-example/blob/master/src/browser.ts), for running in the terminal/browser respectively.

## Getting started

Clone the repository and install the dependencies:

```bash
git clone git@github.com:metachris/flashbots-ethers-example.git
cd flashbots-ethers-example
yarn
```

Run the code in Node.js:

```yarn cli```

Run the code in the browser:

* `yarn esbuild-browser:watch`
* open `browser-test.html` in your browser

To change between examples, update the imports in `src/cli.ts` and `src/browser.ts`.

## License

The code is free to use however you want, no attribution necessary.

## Feedback

Feel free to reach out via Github issues on this repository, or via Twitter [@metachris](https://twitter.com/metachris).
