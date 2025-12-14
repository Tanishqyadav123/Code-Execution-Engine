import { JwtPayloadType } from "../interfaces/auth.interface";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadType;
    }
  }
}
