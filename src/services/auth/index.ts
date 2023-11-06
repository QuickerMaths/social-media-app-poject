import jwtService from "./jsonwebtoken.ts";
import hashService from "./bcrypt.ts";

const authService = Object.freeze({
  jwtService,
  hashService
});

export default authService;
