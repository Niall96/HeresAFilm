const express = require("express");
const usersRouter = require("./routers/users");
const filmsRouter = require("./routers/films");
const actorsRouter = require("./routers/actors");
const reviewsRouter = require("./routers/reviews");
const app = express();

app.use("/users", usersRouter);
app.use("/films", filmsRouter);
app.use("/actors", actorsRouter);
app.use("/reviews", reviewsRouter);

app.listen(3000);
