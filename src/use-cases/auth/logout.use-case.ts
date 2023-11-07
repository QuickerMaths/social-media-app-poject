import refreshTokenDb from "../../data-access/refresh-token/index.ts";

export default function makeLogoutUseCase({
  db
}: {
  db: typeof refreshTokenDb;
}) {
  return async function logoutUseCase({
    refreshToken
  }: {
    refreshToken: string;
  }) {
    await db.deleteRefreshToken({ token: refreshToken });

    return {};
  };
}
