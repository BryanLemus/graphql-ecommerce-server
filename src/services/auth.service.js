import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// retrieve env vars
dotenv.config();

class Auth {
  constructor() {}

  /** Bcrypt */
  static async hashPassword(password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }

  static async matchPasswords(requestPwd, userPwd) {
    return bcrypt.compare(requestPwd, userPwd);
  }

  /** Jsonwebtokens */
  static generateJwt({ username, email, userId }) {
    return jwt.sign({ userId, email, username }, process.env.TOKEN_SECRET, {
      expiresIn: "30 days",
    });
  }

  static getJwtPayload(token) {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  }

  /** Authentication */
  static getUserId({ req = {}, authToken = "" }) {
    if (req.request?.headers) {
      const authHeader = req.request.headers.authorization;
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        if (!token) {
          return null;
        }
        const { userId } = this.getJwtPayload(token);
        return userId;
      }
    } else if (authToken) {
      const { userId } = this.getJwtPayload(authToken);
      return userId;
    }

    return null;
  }
}

export default Auth;
