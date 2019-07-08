const express = require("express");
const userRouter = require("./routes/users");
const adsRouter = require("./routes/ads");
const profileRouter = require("./routes/profile");
const mongoConnect = require("./db/database");

const app = express();

app.use(express.json({ extended: false }));

app.post("/", (req, res) => {
  res.send("qweqweqwe");
});

app.use(userRouter);
app.use(adsRouter);
app.use(profileRouter);
mongoConnect();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("UP and running on port " + 5001);
});
