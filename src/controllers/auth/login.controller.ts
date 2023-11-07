import authUseCase from "../../use-cases/auth/index.ts";
export default function makeLoginController({
  useCase
}: {
  useCase: typeof authUseCase.loginUseCase;
}) {
  return async function loginController(httpRequest: any) {
    const { email, password } = httpRequest.body;

    const { accessToken, refreshToken, user } = await useCase({
      email,
      password
    });

    return {
      statusCode: 200,
      cookies: [
        {
          name: "refreshToken",
          value: refreshToken,
          options: {
            httpOnly: true,
            sameSite: "none",
            secure: true
          }
        },
        {
          name: "accessToken",
          value: accessToken,
          options: {
            httpOnly: true,
            sameSite: "none",
            secure: true
          }
        }
      ],
      body: user
    };
  };
}
