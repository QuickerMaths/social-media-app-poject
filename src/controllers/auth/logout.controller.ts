import authUseCase from "../../use-cases/auth/index.ts";

export default function makeLogoutController({
  useCase
}: {
  useCase: typeof authUseCase.logoutUseCase;
}) {
  return async function logoutController(httpRequest: any) {
    const { refreshToken } = httpRequest.cookies;

    await useCase({ refreshToken });

    return {
      statusCode: 204,
      body: {}
    };
  };
}
