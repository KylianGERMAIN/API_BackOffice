
import { checkSchema } from "express-validator";
import { checkValidator, createRouteFromRoutes } from "../../Function/Utils/createRoutes";
import { createArticle } from "../../Middlewares/Articles/createArticle";

const routes = [
  {
    type: "post",
    route: "/createArticle",
    middlewares: [checkSchema({
    }), checkValidator()],
    next: createArticle
  }
]

export default createRouteFromRoutes(routes)