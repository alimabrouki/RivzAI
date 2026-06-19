import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWTPayload } from "../../global.ds";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "No token",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload &
    JWTPayload;

  req.user = decoded;

  next();
}

export default authMiddleware;
