
import { checkSchema } from "express-validator";
import { checkEmail } from "../../Function/checkParams/checkEmail";
import { checkPassword } from "../../Function/checkParams/checkPassword";
import { checkValidator, createRouteFromRoutes } from "../../Function/Utils/createRoutes";
import { refreshAccesToken } from "../../Middlewares/Auth/refreshAccesToken";

const routes = [
  {
    type: "get",
    route: "/refreshAccesToken",
    middlewares: [checkSchema({
    }), checkValidator()],
    next: refreshAccesToken
  }
]

export default createRouteFromRoutes(routes)