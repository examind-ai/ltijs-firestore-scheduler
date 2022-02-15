<div align="center">
	<br>
	<br>
	<a href="https://cvmcosta.github.io/ltijs"><img width="360" src="https://raw.githubusercontent.com/Cvmcosta/ltijs/master/docs/logo-300.svg"></img></a>
</div>

> LTIJS Cloud Function script to be used with LTIJS Firestore to purge stale documents.

## Introduction

This package purges stage documents created by `@examind/ltijs-firestore` by deploying a [Firebase Function](https://firebase.google.com/docs/functions/schedule-functions) that runs periodically.

## Installation

Install Firebase CLI:

```
npm install -g firebase-tools@10.0.1
```

Inside your project folder (it can be any folder and it's recommended that you use an empty one), initialize a Firebase project:

```
firebase init functions
```

- Are you ready to proceed (Y/n): <kbd>y</kbd>
- Choose your account
- Choose your project
- What language would you like to use to write Cloud Functions? (JavaScript or TypeScript)
- Do you want to use ESLint to catch probable bugs and enforce style? (Y/n): <kbd>n</kbd>
- Do you want to install dependencies with npm now? (Y/n): <kbd>y</kbd>

Install `@examind/ltijs-firestore-scheduler`:

```
npm install @examind/ltijs-firestore-scheduler
```

Replace contents of `functions/index.ts` with:

```
export { purgeStaleDocuments } from '@examind/ltijs-firestore-scheduler';
```

Deploy Function:

```
firebase deploy --only functions
```

## Contibution

If you find a bug or think that something is hard to understand, please open an issue. Pull requests are also welcome 🙂
