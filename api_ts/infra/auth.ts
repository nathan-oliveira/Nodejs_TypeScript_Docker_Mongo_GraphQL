import { Request, Response, NextFunction } from "express";

import * as jwt from "jsonwebtoken";
import Configs from "./configs";

class Auth {
  validate = (req: Request, res: Response, next: NextFunction) => {
    const token: any = req.headers["x-access-token"];

    if (token) {
      jwt.verify(token, Configs.secret, function (err, decoded) {
        if (err) {
          return res.status(403).send({
            success: false,
            message: "403 - unauthorized",
          });
        } else {
          next();
        }
      });
    } else {
      return res.status(401).send({
        success: false,
        message: "401 - unauthorized",
      });
    }
  };
}

export default new Auth();
