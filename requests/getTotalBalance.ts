import { getAllUserTokens } from "./getAllUserToken";
import { getTokenPriceUSDTSingle } from "./getTokenPriceUSDTSingle";

export async function getTotalBalance(address: string, networks: string[]) {
  try {
    for (const network in networks) {
      const currencies = await getAllUserTokens(address, networks[network]);
      let sum = 0;
      for (const currency of currencies) {
        const { Currency, balance } = currency;
        const tokenValue = await getTokenPriceUSDTSingle(
          Currency.SmartContract,
          networks[network]
        );
        const value = parseFloat(tokenValue) * parseFloat(balance);
        sum += value;
      }
      console.log("RESULT");
      console.log(sum, network);
    }
  } catch (error) {
    console.log(error);
  }
}
