const fetcher = require("./axiosInstance");

const getDetailData = (coin) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const detailEndpoint = `/detail?id=${coin.crypto_id}`;

      fetcher({
        url: detailEndpoint,
        method: "GET",
      })
        .then((result) => {
          const contract = result.data?.platforms || [];
          const data = {
            ...coin,
            chain: contract.map((item) => ({
              chain_id: item.contractChainId,
              platform_id: item.contractPlatformId,
              contract_address: item.contractAddress,
              platform: item.contractPlatform,
            })),
          };
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject();
        });
    }, 5000);
  });
};

module.exports = getDetailData;
