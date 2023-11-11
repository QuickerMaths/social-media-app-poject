import jwtService from "./jsonwebtoken.ts";
import hashService from "./bcrypt.ts";

const jwt = jwtService();
const hash = hashService();

const authService = Object.freeze({
  jwt,
  hash
});

export default authService;
