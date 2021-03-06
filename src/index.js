const express = require("express");
const dotenv = require("dotenv");
const database = require("./configs/database");
const getAllData = require("./utils/getAllData");
const applyMiddleware = require("./middlewares");
const getCurrencies = require("./api/getCurrencies");
const cron = require("node-cron");

//initialize
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8756;

//connect database
database.connect();

//middlewares
applyMiddleware(app);

//cronjob
getAllData() //immediately execute
cron.schedule("00 00 00 * * *", async () => getAllData(), {
  scheduled: true,
});

//routes
app.get("/list", getCurrencies);

app.listen(PORT, () => {
  console.log(`App is listen at ${PORT}`);
});
