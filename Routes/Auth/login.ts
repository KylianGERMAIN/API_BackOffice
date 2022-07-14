
import { checkSchema } from "express-validator";
import { checkEmail } from "../../Function/checkParams/checkEmail";
import { checkPassword } from "../../Function/checkParams/checkPassword";
import { checkValidator, createRouteFromRoutes } from "../../Function/Utils/createRoutes";
import { login } from "../../Middlewares/Auth/login";

const routes = [
  {
    type: "post",
    route: "/login",
    middlewares: [checkSchema({
      email: checkEmail,
      password: checkPassword
    }), checkValidator()],
    next: login
  }
]

export default createRouteFromRoutes(routes)