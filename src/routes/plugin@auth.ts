import type { RequestHandler } from "@builder.io/qwik-city";
import { verifyJwt } from "~/util/jwt";
import { prisma } from "~/util/prisma";

export const onRequest: RequestHandler = async ({
  next,
  cookie,
  sharedMap,
  env,
  error,
}) => {
  const accessToken = cookie.get("accessToken");
  if (accessToken) {
    const { payload } = await verifyJwt(
      accessToken.value,
      env.get("JWT_SECRET")!,
    );
    const user = await prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    if (!user) {
      throw error(401, "Unauthenticated");
    }
    sharedMap.set("user", user);
  }
  await next();
};
