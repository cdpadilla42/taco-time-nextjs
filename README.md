# Taco Time

Live Link

[View app in browser](https://taco-time-nextjs.vercel.app/)

## Full Stack Next.JS E-Commerce App

Taco Time is a fictional restaurant taking inspiration from Taco Deli here in Austin, TX. With the need to showcase and allow customers to order an array of breakfast and lunch tacos, this application dynamically renders item pages and maintains a detailed cart that stores their orders and customizations. This intricate project employs multiple modern web development tools and techniques, including Server Side Rendering, interacting with a GraphQL API, running server-less functions and dynamically rendering individual item pages with Next JS’s dynamic routes. Tech used:

- Next.js
- React
- Redux
- GraphQL
- MongoDB
- Mongoose ORM
- Apollo Micro Server
- Apollo Client
- Styled-Components
- React-Transition-Group
- Deployed to Vercel

## Server Side Rendering with Next.js

Next.js allows for choosing between Server Side Rendering and Static Page Generation on a page-by-page basis. For this application, assuming owners may need to post notice that an item has sold out, I’ve opted for SSR. On the server, the application grabs the data it needs and renders the html that will be sent to the client. This process alone took a considerable amount of fine tuning as the application needs to interact with Apollo’s cache and await results from the MongoDB. I was able to eradicate a bit of a nasty bug in this process by having the getServerSideProps function wait for the DB to establish a connection before rendering the page.

## Crafting Server-less Functions in Apollo

The backend is an Apollo Micro Server. Since this iteration of the app only needed to interact with the MongoDB database to fetch items in the restaurant inventory, a lighter server seemed a great fit! The server takes in hand-crafted GraphQL schemas and resolvers. The resolvers then fetch the data from Mongo through interacting with Mongoose schemas.A mutation method was implemented to add items to the database as a developer. A possible expansion would be to create a view for restaurant owners to interact with an elegant UI to do this themselves.

## Interacting with GraphQL API

To interact with the API, Apollo client is used within the SSR functions. To allow for flexibility, the client is written to check for whether it is being used on the server or client. The benefit of only grabbing the relevant data is best seen between the menu page and an individual items page. The menu only needs the name, image, description, and category of an item. The GraphQL query then only requests what it needs. The full item display pages, then, will request further data, such as customizations, options, and price.
