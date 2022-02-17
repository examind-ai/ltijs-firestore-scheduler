<div align="center">
	<br>
	<br>
	<a href="https://cvmcosta.github.io/ltijs"><img width="360" src="https://raw.githubusercontent.com/Cvmcosta/ltijs/master/docs/logo-300.svg"></img></a>
</div>

> LTIJS Cloud Function script to be used with LTIJS Firestore to purge stale documents.

# Introduction

This package purges stale documents created by `@examind/ltijs-firestore` by deploying a [Firebase Function](https://firebase.google.com/docs/functions/schedule-functions) that runs periodically.

# Installation

Install Firebase CLI:

```
npm install -g firebase-tools@10.0.1
```

Create a new empty folder and inside of it, initialize a Firebase project:

```
firebase init functions
```

Select the following options:

- Are you ready to proceed (Y/n): `y`
- Choose your account
- Choose your project
- What language would you like to use to write Cloud Functions? `TypeScript`
- Do you want to use ESLint to catch probable bugs and enforce style? (Y/n): `n`
- Do you want to install dependencies with npm now? (Y/n): `y`

Upgrade `firebase-admin` package inside the functions folder:

```
cd functions
npm install firebase-admin@latest
```

Install `@examind/ltijs-firestore-scheduler` inside the functions folder:

```
cd functions
npm install @examind/ltijs-firestore-scheduler
```

Replace contents of `functions/index.ts` with:

```
export { purgeStaleDocuments } from '@examind/ltijs-firestore-scheduler';
```

Optional: set environment variables to change deployment options:

```
process.env.CLOUD_FUNCTION_REGION = 'northamerica-northeast1';
process.env.CLOUD_FUNCTION_TIMEOUT_SECONDS = '300';
process.env.CLOUD_FUNCTION_MEMORY = '1GB';
process.env.CLOUD_FUNCTION_SCHEDULE = 'every 5 minutes';

export { purgeStaleDocuments } from '@examind/ltijs-firestore-scheduler';
```

Available deployment options:

| Environment Variable           | Description | Default          |
| ------------------------------ | ----------- | ---------------- |
| CLOUD_FUNCTION_REGION          | Region      | us-central1      |
| CLOUD_FUNCTION_TIMEOUT_SECONDS | Timeout     | 120              |
| CLOUD_FUNCTION_MEMORY          | Memory      | 256MB            |
| CLOUD_FUNCTION_SCHEDULE        | Schedule    | every 15 minutes |

<br />
Deploy Function:

```
firebase deploy --only functions
```

# Contribution

If you find a bug or think that something is hard to understand, please open an issue. Pull requests are also welcome 🙂

# Publish

- Bump version in package.json
- `npm install`
- Commit changes
- `npm publish --access public`
