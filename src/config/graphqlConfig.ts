import { UserResolvers, UserTypeDefs } from "../mongodb/users/user.graphql";

const schema = {
  typeDefs: [UserTypeDefs],
  resolvers: [UserResolvers],
};
export default schema;
