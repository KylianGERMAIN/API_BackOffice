import { ParamSchema } from "express-validator"

export const checkEmail: ParamSchema = {
  in: ['body'],
  isEmpty: {
    negated: true,
    errorMessage: "Email is missing",
    bail: true
  },
  isEmail: {
    errorMessage: "Email is wrongly formatted",
    bail: true
  }
}