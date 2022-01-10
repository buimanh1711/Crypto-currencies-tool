const mongoose = require("mongoose");
const { Schema } = mongoose;

const CryptoCurrencySchema = new Schema(
  {
    crypto_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
    },
    slug: {
      type: String,
    },
    to_usd: {
      type: Number,
    },
    chain: [
      {
        platform: String,
        platform_id: String,
        chain_id: String,
        contract_address: String,
      },
    ],
  },
  {
    collection: "crypto_currencies",
  }
);

module.exports = mongoose.model("crypto_currencies", CryptoCurrencySchema);
