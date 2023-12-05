# Backend System API

- An application developed to realize basic banking credit system.

# Features

Comes with the following features implemented/configured

- `typeorm` using database I/O and Query operations
- `winston` logging with Elastic Common Schema (ECS) formatting
- `express` server
- `jest` and `supertest` using Unit testing
- `prettier` and `eslint` using improving code readability
- `express-validator` paramater validation operation
- `cron` scheduling operation
- `typedoc` code documentation

# Prerequisites

To build and run this app locally, you will need a few things:

- Install [Node.js](https://nodejs.org/en/)
- Install [PostgreSQL Standalone](https://www.postgresql.org/download/) or [PostgreSQL Docker](https://hub.docker.com/_/postgres/)

# Getting started

- Clone the repository

```
git clone --depth=1 https://github.com/haliltirgil/credit-system-api <project_name>
```

- Install dependencies

```
cd <project_name>
npm install
```

- Make sure you have docker

```
docker-compose up
```

or

- Make sure PostgreSQL is running
- Make sure you are created Databases
- Modify the `.env.example` file to your liking and rename it to `.env`
- Make sure your NODE_ENV="production"
- Run the project

```
npm start
```

- Import API collection from project directory

## Building

To build the app run

```
npm run build
```

This will compile the project's source code to JavaScript and generate a dist folder in the root directory.

## Testing

[Jest](https://facebook.github.io/jest/) is configured as the testing framework for this project.

### Running tests

- Make sure your NODE_ENV="test"

To run tests:

```
npm run test
```

Running the above command also generates a coverage report.

## Documentation

[Typedoc](https://typedoc.org/) is serving documentation UI for users.

If you don't have ./docs file in project directory run this command for serving docUI:

```
npm run typedoc
```

If you want to show documentation you use live server or open the ".docs/index.html" static file.

## ESLint

ESLint is a code linter that mainly helps catch minor code quality and style issues.

### ESLint rules

Like most linters, ESLint has a wide set of configurable rules as well as support for custom rule sets.
All rules are configured through `.eslintrc` configuration file.
In this project, we are using a combination of some recommended rules from `Jest`, `ESLint`, `Prettier`, and `Airbnb`.

### Running ESLint

To see ESLint feedback as soon as possible, I strongly recommend the [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). This plugin provides linting in real-time.

### Spelling Mistakes

I also recommend using the following VS Code plugin to check for spelling mistakes while coding.

- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
