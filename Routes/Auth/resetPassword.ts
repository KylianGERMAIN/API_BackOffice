
import { checkSchema } from "express-validator";
import { checkEmail } from "../../Function/checkParams/checkEmail";
import { checkPassword } from "../../Function/checkParams/checkPassword";
import { checkValidator, createRouteFromRoutes } from "../../Function/Utils/createRoutes";
import { resetPassword } from "../../Middlewares/Auth/resetPassword";

const routes = [
  {
    type: "post",
    route: "/resetPassword",
    middlewares: [checkSchema({
      password: checkPassword
    }), checkValidator()],
    next: resetPassword
  }
]

export default createRouteFromRoutes(routes)