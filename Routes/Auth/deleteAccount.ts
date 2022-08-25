import { checkSchema } from "express-validator";
import { checkEmail } from "../../Function/checkParams/checkEmail";
import { checkPassword } from "../../Function/checkParams/checkPassword";
import {
  checkValidator,
  createRouteFromRoutes,
} from "../../Function/Utils/createRoutes";
import { deleteAccount } from "../../Middlewares/Auth/deleteAccount";

const routes = [
  {
    type: "post",
    route: "/deleteAccount",
    middlewares: [
      checkSchema({
        email: checkEmail,
        password: checkPassword,
      }),
      checkValidator(),
    ],
    next: deleteAccount,
  },
];

export default createRouteFromRoutes(routes);
