#

# M.A.G.N.E.T

The M.A.G.N.E.T stack is a modern web development stack that consists of four key technologies, namely MongoDB, Express.js, GraphQL, and Apollo GraphQL, along with Node.js as the server-side runtime environment and TypeScript

This stack combines the power of NoSQL databases, server-side TypeScript, and a flexible data query language to create scalable and efficient web applications.

MongoDB provides a flexible and scalable NoSQL database, Express.js is a powerful and popular web framework for Node.js, GraphQL is a query language for APIs that allows for efficient and flexible data fetching, and Apollo GraphQL is a set of tools and server-side components for building GraphQL APIs.

By combining these technologies, developers can create powerful and flexible web applications that can be easily extended and scaled.

## Tech Stack

Node, Express, MongoDB, Graphql, Apollo-server, TypeScript.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL='mongodb://127.0.0.1:27017/<your-server-name>'`

`PORT = 6060`

`MONGO_URL_USERNAME=<your-mongodb-username>`

`MONGO_URL_PASSWORD=<your-mongodb-password>`

If you are using mongodb compass on your local computer, then both username and password are empty strings, i.e. ""

## Installation

To get started with the project, create a folder in your local machine for this project and run the following commands in the root of your folder

```bash
    git clone https://github.com/SayedJamil/M.A.G.N.E.T.git
    cd M.A.G.N.E.T
    yarn
    yarn server
```
