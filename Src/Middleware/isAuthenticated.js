import UserModel from "../Models/UserSchema.js";
import jwt from "jsonwebtoken";

const isUserAuthenticated = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return next(new Error("Token missing from request"));
    }
    token = token.split(" ")[1];
    const decodeUser = jwt.verify(token, "NewPrivateKey");
    req.user = await UserModel.findById(decodeUser.id);
    next();
  } catch (error) {
    return next(new Error("Something went wrong"));
  }
};

export default isUserAuthenticated;
