import { gql } from "apollo-server-core";

export const tokenType = gql`
  type Token {
    value: String
  }
`;
