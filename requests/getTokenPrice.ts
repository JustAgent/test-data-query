import axios from "axios";

export async function getTokenPrice(tokenAddress: string) {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenAddress}&vs_currencies=usd`
    );
    const tokenPrice = response.data[tokenAddress.toLowerCase()];
    console.log(tokenPrice ? tokenPrice.usd : "Shitcoin");
  } catch (error) {
    console.error("Error fetching token price:", error);
    return null;
  }
}
