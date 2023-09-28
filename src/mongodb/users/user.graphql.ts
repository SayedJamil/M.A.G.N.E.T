import { CreateUserInput, CredentialsInput } from "./user.type";
import { GraphQLError } from "graphql";
import {
  getAllUsers,
  getUserByID,
  registerUser,
  signInUser,
} from "./user.service";

export const UserTypeDefs = `
#graphql
type User{
    id:String
    email: String
    firstName: String
    lastName: String
    source: String
    verified: String
    creationDate: String
}
type AllUsersResponse{
  success:Boolean
  message:String
  users:[User]
}
type GetCurrentUserResponse{
  success:Boolean
  message:String
  users:User
}
type CreateUsersResponse{
  success:Boolean
  message:String
  users:User
  accessToken:String
}
type LoginUsersResponse{
  success:Boolean
  message:String
  users:User
  accessToken:String
}
type Query{
  allUsers:AllUsersResponse
  getCurrentUser:GetCurrentUserResponse
}
type Mutation{
  createUser(
    email: String!
    fullName: String!
    password: String!
  ):CreateUsersResponse
  loginUser(
    email: String!
    password: String!
  ):LoginUsersResponse
}

`;
export const UserResolvers = {
  Query: {
    async allUsers(_: any, args: any, { userID }: { userID: any }) {
      if (!userID)
        throw new GraphQLError("you must be logged in to query this schema", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      return await getAllUsers().then((response) => {
        return response;
      });
    },
    async getCurrentUser(_: any, args: any, { userID }: { userID: any }) {
      if (!userID)
        throw new GraphQLError("you must be logged in to query this schema", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      return await getUserByID(userID).then((response) => {
        return response;
      });
    },
  },
  Mutation: {
    async createUser(_: any, user: CreateUserInput) {
      return await registerUser(user).then((response) => {
        return response;
      });
    },
    async loginUser(_: any, credentials: CredentialsInput) {
      return await signInUser(credentials).then((response) => {
        return response;
      });
    },
  },
};
