import jwt from "jsonwebtoken";
import config from "../../config/config.ts";
import { VerifyErrors } from "jsonwebtoken";
import { ITokenPayload } from "./types.ts";

export default function jwtService() {
  const verifyToken = ({ token }: { token: string }): any =>
    jwt.verify(
      token,
      config.jwt.jwt_token,
      (err: VerifyErrors | null, decoded: any) => {
        if (err && err.name === "TokenExpiredError") return "expired";
        if (err) return;
        return decoded;
      }
    );

  const verifyRefreshToken = ({ token }: { token: string }): any => {
    return jwt.verify(
      token,
      config.jwt.jwt_refresh_token,
      (err: VerifyErrors | null, decoded: any) => {
        if (err) return err;

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

  const generateToken = ({ payload }: { payload: ITokenPayload }) =>
    jwt.sign(payload, config.jwt.jwt_token, {
      expiresIn: config.jwt.jwt_expiration
    });

  const generateRefreshToken = ({ payload }: { payload: ITokenPayload }) => {
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
