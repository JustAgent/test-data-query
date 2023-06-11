import { getAllUserTokens } from "./getAllUserToken";
import { getTokenPrice } from "./getTokenPrice";
import { getTokenPriceUSDTSingle } from "./getTokenPriceUSDTSingle";

export async function getTotalBalance(address: string, networks: string[]) {
  try {
    for (const network in networks) {
      const currencies = await getAllUserTokens(address, networks[network]);
      let sum = 0;
      for (const currency of currencies) {
        const { Currency, balance } = currency;
        const tokenPrice = await getTokenPriceUSDTSingle(
          Currency.SmartContract,
          networks[network]
        );
        // Тоже долго + err 429
        // const tokenPrice = await getTokenPrice(
        //   Currency.SmartContract,
        //   networks[network]
        // );
        console.log(`Price of ${Currency.SmartContract} = ${tokenPrice}`);
        const value = parseFloat(tokenPrice) * parseFloat(balance);
        sum += value;
      }
      console.log(`Total balance at ${networks[network]} in $: ${sum}`);
    }
  } catch (error) {
    console.log(error);
  }
}
