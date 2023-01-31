const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { json, urlencoded } = require("body-parser");
const {
  FilmsRouter,
  ReviewsRouter,
  UsersRouter,
  AuthRouter,
} = require("./routers");
const { verifyToken } = require("./middleware/auth");
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

/* configure Swagger */
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    baseUrl: "https://HeresAFilm.com/api/v1/",
    title: "HeresAFilm API",
    version: "v1",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        in: "header",
        name: "Authorization",
        description: "Bearer token to access these api endpoints",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
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
app.all("*", verifyToken);
app.use("/auth", AuthRouter);
app.use("/films", FilmsRouter);
app.use("/users", UsersRouter);
app.use("/reviews", ReviewsRouter);
app.use((err, req, res, next) => {
  res.status(500).send(err);
});
module.exports = app;
