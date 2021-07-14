const express = require("express");
const userRouter = require("./routes/user");
const itemRouter = require("./routes/item");
const app = express();
const port = 5000;
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/item", itemRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
