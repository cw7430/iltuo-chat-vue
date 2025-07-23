import jwt from "jsonwebtoken";

import { config } from "../configs";

const ACCESS_SECRET = config.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = config.JWT_REFRESH_SECRET!;
export const ACCESS_TOKEN_EXPIRES_IN_SECONDS = 5 * 60; // 5분
export const REFRESH_TOKEN_EXPIRES_IN_SECONDS = 7 * 24 * 60 * 60; // 7일

export const generateAccessToken = (
  userId: string,
  authority: "ADMIN" | "USER"
): string => {
  return jwt.sign({ authority }, ACCESS_SECRET, {
    subject: userId,
    expiresIn: ACCESS_TOKEN_EXPIRES_IN_SECONDS,
  });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({}, REFRESH_SECRET, {
    subject: userId,
    expiresIn: REFRESH_TOKEN_EXPIRES_IN_SECONDS,
  });
}

export const verifyAccessToken = (token: string): jwt.JwtPayload => {
  return jwt.verify(token, ACCESS_SECRET) as jwt.JwtPayload;
};

export const verifyRefreshToken = (token: string): jwt.JwtPayload => {
  return jwt.verify(token, REFRESH_SECRET) as jwt.JwtPayload;
};
