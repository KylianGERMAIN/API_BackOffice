import { checkSchema } from "express-validator";
import { checkId } from "../../Function/checkParams/checkArticle";

import {
  checkValidator,
  createRouteFromRoutes,
} from "../../Function/Utils/createRoutes";
import { deleteArticle } from "../../Middlewares/Articles/deleteArticle";

const routes = [
  {
    type: "post",
    route: "/deleteArticle",
    middlewares: [
      checkSchema({
        id: checkId,
      }),
      checkValidator(),
    ],
    next: deleteArticle,
  },
];

export default createRouteFromRoutes(routes);
