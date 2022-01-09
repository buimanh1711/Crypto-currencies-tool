const axios = require("axios");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const request = require("./axiosInstance");

//initialize
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8756;

//middlewares
app.use(cors({ credentials: true, origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.get("/list", async (req, res, next) => {
  try {
    const { params } = req;
    let url =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=100&convert=USD";

    // if (params.crypto_type) url += `&cryptoType=${params.crypto_type}`;
    // else url += `&cryptoType=all`;

    const cryptoResponse = await request({
      url: url,
      method: "GET",
    });

    // const cryptoList = cryptoResponse.data?.cryptoCurrencyList;
    // const originData = cryptoList.map((item) => ({
    //   id: item.id,
    //   name: item.name,
    //   symbol: item.symbol,
    //   slug: item.slug,
    //   toUsd: item.quotes[0]?.price,
    // }));

    // let promises = [];

    // originData.forEach((coin) => {
    //   const detailEndpoint = `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail?id=${coin.id}`;
    //   promises.push(
    //     request({
    //       url: detailEndpoint,
    //       method: "GET",
    //     })
    //   );
    // });

    // const contractResponse = await Promise.all(promises);
    // const contracts = contractResponse.map((resp) => resp.data.platforms);

    // const result = originData.map((item, index) => {
    //   const contract = contracts[index] || [];

    //   return {
    //     ...item,
    //     contract: contract.map((item) => ({
    //       id: item.contractId,
    //       address: item.contractAddress,
    //       platform: item.contractPlatform,
    //     })),
    //   };
    // });

    res.json({
      list: cryptoResponse,
    });
  } catch (error) {
    console.log(error);
    res.send("ERROR");
  }
});

app.listen(PORT, () => {
  console.log(`App is listen at ${PORT}`);
});
