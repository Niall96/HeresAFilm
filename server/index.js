const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { FilmsRouter, ReviewsRouter, UsersRouter } = require("./routers");
const app = express();
/* configure Swagger */
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    baseUrl: "https://HeresAFilm.com/api/v1/",
    title: "HeresAFilm API",
    version: "v1",
  },
};

const openapiSpecification = swaggerJsdoc({
  swaggerDefinition,
  apis: ["./routers/*.js"],
});

/* setup Swagger Docs */
app.use("/docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));
app.use("/swagger.json", (req, res) =>
  res.json(openapiSpecification).status(200)
);

app.use("/users", UsersRouter);
app.use("/films", FilmsRouter);
app.use("/reviews", ReviewsRouter);
app.listen(3000);
