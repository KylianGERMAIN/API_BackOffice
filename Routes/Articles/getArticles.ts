import { checkSchema } from "express-validator";
import { checkId } from "../../Function/checkParams/checkArticle";

import {
  checkValidator,
  createRouteFromRoutes,
} from "../../Function/Utils/createRoutes";
import { getArticles } from "../../Middlewares/Articles/getArticles";

const routes = [
  {
    type: "get",
    route: "/getArticles",
    middlewares: [
      checkSchema({
        // id: checkId,
      }),
      checkValidator(),
    ],
    next: getArticles,
  },
];

export default createRouteFromRoutes(routes);
