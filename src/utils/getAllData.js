const fetcher = require("../configs/fetcher");
const getDetailData = require("./getDetail");
const CryptoCurrencyModel = require("../model/cryptoCurrencyModel");
// const dotenv = require("dotenv");
// dotenv.config();

const getAllData = async () => {
  console.log("START");
  try {
    let url = `/listing?sortBy=market_cap&sortType=desc&convert=USD&start=1&limit=${process.env.LIMIT}`;

    const cryptoResponse = await fetcher({
      url: url,
      method: "GET",
    });

    const cryptoList = cryptoResponse.data?.cryptoCurrencyList || [];
    const originData = cryptoList.map((item) => ({
      crypto_id: String(item.id),
      name: item.name,
      symbol: item.symbol,
      slug: item.slug,
      to_usd: Number(item.quotes[0]?.price || 0),
    }));

    const apiResponse = [];
    for (const coin of originData) {
      try {
        const data = await getDetailData(coin);
        await CryptoCurrencyModel.findOneAndUpdate(
          {
            crypto_id: data.crypto_id,
          },
          data,
          {
            upsert: true,
          }
        );

        apiResponse.push(data);
      } catch (error) {
        console.log(error);
      }
    }

    console.log("DONE");
  } catch (error) {
    console.log(error);
  }
};

module.exports = getAllData;
