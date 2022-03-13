const { gql } = require("apollo-server-core");

const queryType = gql`
  scalar Date

  type Query {
    empty: String
  }
`;

module.exports = queryType;
