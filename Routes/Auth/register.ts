
import { checkSchema } from "express-validator";
import { checkEmail } from "../../Function/checkParams/checkEmail";
import { checkPassword } from "../../Function/checkParams/checkPassword";
import { checkValidator, createRouteFromRoutes } from "../../Function/Utils/createRoutes";
import { register } from "../../Middlewares/Auth/register";

const routes = [
  {
    type: "post",
    route: "/register",
    middlewares: [checkSchema({
      email: checkEmail,
      password: checkPassword
    }), checkValidator()],
    next: register
  }
]

export default createRouteFromRoutes(routes)