import jwt from "jsonwebtoken";
import { JwtPayloadType } from "../interfaces/auth.interface";

export const generateAccessToken = (payload: JwtPayloadType) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY!);
};
export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayloadType;
};
