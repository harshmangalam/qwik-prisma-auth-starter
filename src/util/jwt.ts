import * as jose from "jose";
import { JWT_EXP_TIME } from "~/config/constatnt";

async function createJwt(userId: string, JWT_SECRET: string) {
  return new jose.SignJWT({
    sub: userId,
  })
    .setProtectedHeader({ alg: "RS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXP_TIME)
    .sign(new TextEncoder().encode(JWT_SECRET));
}

async function verifyJwt(token: string, JWT_SECRET: string) {
  return await jose.jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
}

export { createJwt, verifyJwt };
