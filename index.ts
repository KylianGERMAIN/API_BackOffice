import app from "./app";

export var server = app.listen(process.env.PORT, () => {
  console.log(
    `[API_BackOffice]: Server is running at http://localhost:${process.env.PORT}`
  );
});
