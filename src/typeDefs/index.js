import { queryType } from "./query.type.js";
import { mutationType } from "./mutation.type.js";
import { userType } from "./user.type.js";
import { productType } from "./product.type.js";
import { categoryType } from "./category.type.js";
import { reviewType } from "./review.type.js";
import { tokenType } from "./token.type.js";

export const typeDefs = [
  queryType,
  mutationType,
  userType,
  productType,
  categoryType,
  reviewType,
  tokenType,
];
