const { gql } = require("apollo-server-core");

const tokenType = gql`
  type Token {
    value: String
  }
`;

module.exports = tokenType;
