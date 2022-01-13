const CryptoCurrencyModel = require("../model/cryptoCurrencyModel");

const getCurrencies = async (req, res, next) => {
  const { query } = req;
  let limit = null;
  let filters = {};

  if (query.platform_id) filters["chain.platform_id"] = query.platform_id;
  if (query.chain_id) filters["chain.chain_id"] = query.chain_id;

  if (query.limit > 0) limit = query.limit;

  const response = await CryptoCurrencyModel.find(
    filters,
    null,
    {
      limit,
    }
  );

  if (!response || response === "null" || response === "undefined")
    res.json({
      status: "FAIL",
      message: "Can not get data",
    });

  res.json({
    status: "OK",
    message: "Get data successfully!",
    data: response,
  });
};

module.exports = getCurrencies;
