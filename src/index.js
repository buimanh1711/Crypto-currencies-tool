const axios = require("axios");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetcher = require("./axiosInstance");
const database = require("./database");
const getAllData = require("./getAllData");

//initialize
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8756;

//connect database
database.connect();

//middlewares
app.use(cors({ credentials: true, origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
(async function () {
  console.log(await getAllData());
})();
app.get("/list", async (req, res, next) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`App is listen at ${PORT}`);
});
