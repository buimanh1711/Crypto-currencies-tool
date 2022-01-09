const axios = require("axios");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetcher = require("./axiosInstance");
const database = require("./database");

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
app.get("/list", async (req, res, next) => {
  try {
    const { query } = req;
    let start = 1,
      limit = 10;

    if (Number(query.start) > 0) start = query.start;
    if (Number(query.limit) > 0) limit = query.limit;

    let url = `/listing?sortBy=market_cap&sortType=desc&convert=USD&start=${start}&limit=${limit}`;

    const cryptoResponse = await fetcher({
      url: url,
      method: "GET",
    });

    const cryptoList = cryptoResponse.data?.cryptoCurrencyList;
    const originData = cryptoList.map((item) => ({
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      slug: item.slug,
      toUsd: item.quotes[0]?.price,
    }));

    let promises = [];

    originData.forEach((coin) => {
      const detailEndpoint = `/detail?id=${coin.id}`;
      promises.push(
        fetcher({
          url: detailEndpoint,
          method: "GET",
        })
      );
    });

    const contractResponse = await Promise.all(promises);
    const contracts = contractResponse.map((resp) => resp.data.platforms);

    const result = originData.map((item, index) => {
      const contract = contracts[index] || [];

      return {
        ...item,
        contract: contract.map((item) => ({
          id: item.contractId,
          address: item.contractAddress,
          platform: item.contractPlatform,
        })),
      };
    });

    res.json({
      list: result,
    });
  } catch (error) {
    console.log(error);
    res.send("ERROR");
  }
});

app.listen(PORT, () => {
  console.log(`App is listen at ${PORT}`);
});
