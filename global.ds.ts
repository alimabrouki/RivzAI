import "express";

export interface JWTPayload {
  id: number;
  email: string;
}

declare module "express" {
  interface Request {
    user?: JWTPayload;
  }
}
