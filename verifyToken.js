import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
   const token = req.cookies.token;
   if (!token) return next(createError(401, "you are not authenticate!"));

   jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) return next(createError(403, "token is not valid!"));
      req.user = user;
      next();
   });
};
