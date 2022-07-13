import { ParamSchema } from "express-validator"

export const checkPassword: ParamSchema = {
  in: ["body"],
  isEmpty: {
    negated: true,
    errorMessage: "Password is missing",
    bail: true
  },
  custom: {
    options: (value: string) => {
      return value.length >= 6
    },
    errorMessage: "Password need to be 6 length"
  }
}