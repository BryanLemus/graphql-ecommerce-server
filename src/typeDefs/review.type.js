import { gql } from "apollo-server-core";

export const reviewType = gql`
  type Review {
    author: User
    product: Product
    date: String
    title: String
    body: String
  }
`;
