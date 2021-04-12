# Chess.com Data Sheet

## About

This project was built as a Proof of Concept, to test the [Chess.com Public Data API](https://www.npmjs.com/package/chess-web-api).

It features a simple stack of:

* [TypeScript](https://www.typescriptlang.org/) to ensure type safety
* [Tailwind CSS](https://tailwindcss.com/) to quickly mock up a layout
* [Parcel](https://parceljs.org/) to bundle everything together
* [GitHub Actions](https://github.com/features/actions) for deployment
* [GitHub Pages](https://pages.github.com/) for hosting
* [Jest](https://jestjs.io/) for unit testing

## Reflections

### Why not React?

I have previously used React extensively for other projects. For this project, I wanted to focus on TypeScript and Tailwind.

The UI seemed simple enough that React would be overkill. However, as I introduced more and more interactive elements, I did wonder if I should've gone with React.

## Why not Webpack?

As the project consists of just a few TypeScript files, it felt like Webpack would be **way** overkill.

I had never used Parcel before, but their promise of "zero configuration bundler" seemed way attractive to pass up on. And it *just works*!

The only issue with Parcel is that it doesn't raise type errors - they are simply ignored when bundling. That's why you have a linter, though - right? ¯\\\_(ツ)\_/¯

## Contributing

All contributions are welcome.

To start developing:

1. Ensure [`Node`](https://nodejs.org/en/download/) and [`yarn`](https://yarnpkg.com/getting-started/install) are installed
1. Clone the project
1. Run `yarn install` to install dependencies
1. Run `yarn dev` to start the development server
1. Go to `http://localhost:1234`