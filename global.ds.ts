import "express";

export interface JWTPayload {
  id: string;
  email: string;
}

declare module "express" {
  interface Request {
    user?: JWTPayload;
  }
}
