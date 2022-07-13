import express, { Router } from "express";
import { validationResult } from "express-validator";

function createRouteFromRoutes(routes: any[]) {
  const router: any = express.Router()
  for (const route of routes) {
    router[route.type](route.route, ...route.middlewares, route.next)
  }
  return router
}

function checkValidator() {
  return (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).send(errors)
      return
    }
    else {
      next()
    }
  }
}

export {
  createRouteFromRoutes,
  checkValidator
}