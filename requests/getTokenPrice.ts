import axios from "axios";

export async function getTokenPrice(tokenAddress: string, network: string) {
  let actualNetwork;

  if (network === "eth") {
    actualNetwork = "ethereum";
    if (tokenAddress == "0x") {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
        );
        const tokenPrice = await response.data.ethereum.usd;
        return tokenPrice;
      } catch (error) {
        console.log(error);
      }
    }
  }
  if (network === "bsc") {
    actualNetwork = "binance-smart-chain";
    if (tokenAddress == "0x") {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd`
        );
        const tokenPrice = await response.data.binancecoin.usd;
        return tokenPrice;
      } catch (error) {
        console.log(error);
      }
    }
  }
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/token_price/${actualNetwork}?contract_addresses=${tokenAddress}&vs_currencies=usd`
    );
    const tokenPrice = response.data[tokenAddress.toLowerCase()];
    const price = tokenPrice ? tokenPrice.usd : 0;
    console.log(price);
    return price;
  } catch (error) {
    console.error("Error fetching token price:", error);
    return null;
  }
}
