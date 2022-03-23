import { gql } from "apollo-server-core";

const typeDef = gql`
  type Token {
    value: String
  }
`;

export default typeDef;
