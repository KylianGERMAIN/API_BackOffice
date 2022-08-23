import { ParamSchema } from "express-validator";

export const checkContent: ParamSchema = {
  in: ["body"],
  isEmpty: {
    negated: true,
    errorMessage: "Content is missing",
    bail: true,
  },
};

export const checkTitle: ParamSchema = {
  in: ["body"],
  isEmpty: {
    negated: true,
    errorMessage: "Title is missing",
    bail: true,
  },
};

export const checkId: ParamSchema = {
  in: ["body"],
  isEmpty: {
    negated: true,
    errorMessage: "Id is missing",
    bail: true,
  },
};
