import { checkSchema } from "express-validator";
import {
  checkContent,
  checkId,
  checkTitle,
} from "../../Function/checkParams/checkArticle";

import {
  checkValidator,
  createRouteFromRoutes,
} from "../../Function/Utils/createRoutes";
import { updateArticles } from "../../Middlewares/Articles/updateArticle";

const routes = [
  {
    type: "post",
    route: "/updateArticle",
    middlewares: [
      checkSchema({
        id: checkId,
        title: checkTitle,
        content: checkContent,
      }),
      checkValidator(),
    ],
    next: updateArticles,
  },
];

export default createRouteFromRoutes(routes);
