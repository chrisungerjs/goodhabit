# GoodHabit

Daily habit tracking checklist that automatically resets to help you stay focused and turn vague goals into long-term habits.

I find most habit tracking apps currently in the app store convoluted and difficult to use, so I wanted to build something simple but powerful that was easy to use and felt more like a lightweight to-do app. It was important for me that I choose technologies that are flexible and adaptable, because I plan to continue working on the app. For that reason, I decided I wanted to build an Apollo GraphQL application layer that will serve as the basis of the app going forward. With that in place, I can choose to swap out components like the database and even the frontend framework later on down the line, without having to fundamentally change the underlying API. I chose MongoDB Atlas for the database because I am familiar with it, but I would like to explore possible alternatives in the future, including SQL/Postgres, with or without something like TypeORM.

### Technologies Used:

- TypeScript
- Next React
- Apollo GraphQL
- MongoDB Atlas
- React Bootstraps
- React Beautiful DnD
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
