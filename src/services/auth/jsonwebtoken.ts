import jwt from "jsonwebtoken";
import config from "../../config/config.ts";
import { VerifyErrors, TokenExpiredError } from "jsonwebtoken";

interface IJwtPayload {
  id: number;
  username: string;
  email: string;
}

export default function jwtService() {
  const verifyToken = ({ token }: { token: string }) =>
    jwt.verify(token, config.jwt.jwt_token, (err, decoded) => {
      if (err && err.name === "TokenExpiredError") return "expired";
      if (err) return;
      return decoded;
    });

  const verifyRefreshToken = ({ token }: { token: string }) => {
    return jwt.verify(
      token,
      config.jwt.jwt_refresh_token,
      (err: VerifyErrors | null, decoded: any) => {
        if (err instanceof TokenExpiredError) return "expired";
        if (err) return;

        if (decoded) {
          const toSign = {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email
          };

          return jwt.sign(toSign, config.jwt.jwt_token, {
            expiresIn: config.jwt.jwt_refresh_token
          });
        }
        return;
      }
    );
  };

  const decodeToken = ({ token }: { token: string }) => jwt.decode(token);

  const generateToken = ({ payload }: { payload: IJwtPayload }) =>
    jwt.sign(payload, config.jwt.jwt_token, {
      expiresIn: config.jwt.jwt_expiration
    });

  const generateRefreshToken = ({ payload }: { payload: IJwtPayload }) => {
    return jwt.sign(payload, config.jwt.jwt_refresh_token, {
      expiresIn: config.jwt.jwt_refresh_expiration
    });
  };

  return Object.freeze({
    verifyToken,
    verifyRefreshToken,
    decodeToken,
    generateToken,
    generateRefreshToken
  });
}
