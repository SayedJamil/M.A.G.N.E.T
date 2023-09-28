import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import session from "express-session";
import schema from "./config/graphqlConfig";
import mongoose, { ConnectOptions } from "mongoose";
import { confirmUser } from "./mongodb/users/user.service";
dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
const port = process.env.PORT;
var corsOptions = {
  origin: "http://localhost:5272",
  credentials: true, // <-- REQUIRED backend setting
};
app.use(cors(corsOptions));
app.use(cors());

const url = process.env.MONGO_URL as string;
mongoose.set("strictQuery", false);
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: "admin",
  user: process.env.MONGO_URL_USERNAME as string,
  pass: process.env.MONGO_URL_PASSWORD as string,
} as ConnectOptions);
app.use(
  session({
    secret: "M.A.G.N.E.T",
  })
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // We are connected to the database
  console.log("Connected to MongoDB server: M.A.G.N.E.T");
});

async function startServer() {
  const apolloServer = new ApolloServer(schema);
  await apolloServer.start();
  app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => {
        const token = req.headers.authorization || "";
        if (token) {
          const userResponse = confirmUser(token);
          return { userID: userResponse.data.userID };
        }
        return { userID: undefined };
      },
    })
  );
}
startServer();

var server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  console.log(
    `⚡️[server]: Server is running at http://localhost:${port}/graphql`
  );
});
server.setTimeout(600000);
