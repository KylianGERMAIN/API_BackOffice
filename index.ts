import app from "./app";

export var server = app.listen(process.env.PORT, () => {
  const crypto = require("crypto");
  console.log(crypto.randomBytes(64).toString("hex"));
  console.log(
    `[API_BackOffice]: Server is running at http://localhost:${process.env.PORT}`
  );
});
