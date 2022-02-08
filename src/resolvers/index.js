import { productResolvers } from "./product.js";
import { userResolvers } from "./user.js";

export const resolvers = [ userResolvers, productResolvers];
