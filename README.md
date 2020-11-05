# GoodHabit

Daily habit tracking checklist that automatically resets to help you stay focused and turn vague goals into long-term habits.

I find most habit tracking apps currently in the app store convoluted and difficult to use, so I wanted to build something simple but powerful that was easy to use and felt more like a lightweight to-do app. It was important for me that I choose technologies that are flexible and adaptable, because I plan to continue working on the app. For that reason, I decided I wanted to build an Apollo GraphQL application layer that will serve as the basis of the app going forward. With that in place, I can choose to swap out components like the database and even the frontend framework later on down the line, without having to fundamentally change the underlying API. I chose MongoDB Atlas for the database because I am familiar with it, but I would like to explore possible alternatives in the future, including SQL/Postgres, with or without something like TypeORM. I used Next for the frontend because I wanted to take advantage of Next's API routes to host everything in one place. I really like being able to use the same repo for both frontend and server-side code, and even share utilities and components between them. I also like Vercel for dead-simple deployment.

I wanted to be able to drag and drop habits to rearrange their order, so I tried a few different libraries. I had to brush up on my render props pattern knowledge, but I found react-beautiful-dnd to be really powerful and easy to set up.

I also wanted to implement authentication and authorization to secure user data behind a login. I have rolled my own JWT auth server before, but I wanted to take advantage of a service that both handled the auth security for me and offered OTP services. I wanted to find something simple, secure, and flexible so I can continue to improve it and add options in the future. I tried several services from different vendors, including next-auth and auth0, but I decided on Cotter because they offered incredibly simple OTP passwordless login via email or phone number, plus some other options like social login with GitHub and Google, which I am planning to implement in future updates.

I used Bootswatch Darkly and React-Bootstrap for the app's prototype styles. I quite like the default Accordion Card component from React-Bootstrap, and it was a great way to easily add solid prototype style. I'm planning to collaborate with a designer to redesign the app in the near future, and will likely use styled-components to implement those styles.

### Technologies Used:

- TypeScript
- Next React
- Apollo GraphQL
- MongoDB Atlas
- React Bootstrap
- React Beautiful DnD
- Cotter Passwordless Auth

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

### Local Install Instructions:

- fork and clone repo
- `npm init` or `yarn` to install dependencies
- create a file in the root directory called `.env.local` and define the following environment variables:
  - `MONGODB_URI` - can be either a local mongodb server or a cloud-hosted cluster
  - `MONGODB_DB` - the name of the database, which will be created automatically
- `npm run dev` or `yarn dev` to launch local development server
- navigate to `localhost:3000` in your browser and log in

Note: to edit types or graphql queries/mutations you will want to set up GraphQL Code Generator. The easiest way to do that is with the CLI wizard by running `npx graphql-codegen init` or `yarn graphql-codegen init` and following the command line prompts. For more information check out the [GraphQL Code Generator Docs](https://graphql-code-generator.com/docs/getting-started/installation).
