import { checkSchema } from "express-validator";
import {
  checkContent,
  checkTitle,
} from "../../Function/checkParams/checkArticle";
import { checkEmail } from "../../Function/checkParams/checkEmail";
import {
  checkValidator,
  createRouteFromRoutes,
} from "../../Function/Utils/createRoutes";
import { createArticle } from "../../Middlewares/Articles/createArticle";

const routes = [
  {
    type: "post",
    route: "/createArticle",
    middlewares: [
      checkSchema({
        email: checkEmail,
        title: checkTitle,
        content: checkContent,
      }),
      checkValidator(),
    ],
    next: createArticle,
  },
];

export default createRouteFromRoutes(routes);
