
import { checkSchema } from "express-validator";
import { checkEmail } from "../../Function/checkParams/checkEmail";
import { checkPassword } from "../../Function/checkParams/checkPassword";
import { checkValidator, createRouteFromRoutes } from "../../Function/Utils/createRoutes";
import { refreshAccessToken } from "../../Middlewares/Auth/refreshAccessToken";

const routes = [
  {
    type: "get",
    route: "/refreshAccessToken",
    middlewares: [checkSchema({
    }), checkValidator()],
    next: refreshAccessToken
  }
]

export default createRouteFromRoutes(routes)