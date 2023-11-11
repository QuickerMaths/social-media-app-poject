import authService from "../../services/auth/index.ts";

export default function makeVerifyUseCase({
  auth
}: {
  auth: typeof authService.jwt;
}) {
  return async function verifyUseCase({
    requestAccessToken
  }: {
    requestAccessToken: string;
  }) {
    const user = auth.decodeToken({ token: requestAccessToken });

    //TODO: custom error
    if (!user) {
      throw new Error("Invalid Token");
    }

    return user;
  };
}
