# GoodHabit

Daily habit tracking checklist that automatically resets to help you stay focused and turn vague goals into long-term habits.

### Technologies Used:

- TypeScript
- Next React
- React Beautiful DnD
- React Bootstrap (prototype styles)
- Apollo GraphQL
- MongoDB Atlas
- Cotter Passwordless Auth

### Local Install Instructions:

- fork and clone repo
- `npm init` or `yarn` to install dependencies
- create a file in the root directory called `.env.local` and define the following environment variables:
  - `MONGODB_URI` - can be either a local mongodb server or a cloud-hosted cluster
  - `MONGODB_DB` - the name of the database, which will be created automatically
- `npm run dev` or `yarn dev` to launch local development server
- navigate to `localhost:3000` in your browser and log in

Note: to edit types or graphql queries/mutations you will want to set up GraphQL Code Generator. The easiest way to do that is with the CLI wizard by running `npx graphql-codegen init` or `yarn graphql-codegen init` and following the command line prompts. For more information check out the [GraphQL Code Generator Docs](https://graphql-code-generator.com/docs/getting-started/installation).

### To-Do:

- GraphQL Schema
  - Error handling
  - TypeORM/postgres?
  - Restructure into user db
- All Habits View
- One-off, untimed tasks
- expand tracking objects to include custom metrics
- Task Scheduling
- Calendar View
- Redo Style
