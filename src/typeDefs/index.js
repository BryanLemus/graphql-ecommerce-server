const queryType = require("./query.type.js");
const mutationType = require("./mutation.type.js");
const userType = require("./user.type.js");
const productType = require("./product.type.js");
const categoryType = require("./category.type.js");
const reviewType = require("./review.type.js");
const orderType = require("./order.type.js");
const tokenType = require("./token.type.js");

const typeDefs = [
  queryType,
  mutationType,
  userType,
  productType,
  categoryType,
  reviewType,
  tokenType,
  orderType,
];

module.exports = typeDefs;
