const express = require("express");

const DBconnection = require("./DB/db-connection");

const env = require("dotenv");

const app = express();

env.config();

DBconnection(process.env.MONGO_URL).then(() => {
  console.log("connected with db");
});

app.use(express.json());

const urlRoute = require("./routes/short-link.route");

app.use("/url", urlRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`server started on ${PORT}`));
