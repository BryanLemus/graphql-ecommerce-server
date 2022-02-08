import { gql } from "apollo-server-core";

export const queryType = gql`
  type Query {
    empty: String
  }
`;
