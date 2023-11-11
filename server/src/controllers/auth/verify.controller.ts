import authUseCase from "../../use-cases/auth/index.ts";

export default function makeVerifyController({
  useCase
}: {
  useCase: typeof authUseCase.verifyUseCase;
}) {
  return async function verifyController(httpRequest: any) {
    const { accessToken } = httpRequest.cookies;

    if (!accessToken)
      return { statusCode: 400, body: { message: "Access token is required" } };

    const user = await useCase({ requestAccessToken: accessToken });

    return { statusCode: 200, body: user };
  };
}
