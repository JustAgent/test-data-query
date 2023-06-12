import { getAllUserTokens } from "./getAllUserToken";
import { getTokenPrice } from "./getTokenPrice";
import { getTokenPriceUSDTSingle } from "./getTokenPriceUSDTSingle";

export async function getTotalBalance(address: string, networks: string[]) {
  const startTime = performance.now();
  try {
    const requestPromises = networks.map(async (network) => {
      const currencies = await getAllUserTokens(address, network);
      let sum = 0;
      const currencyPromises = currencies.map(async (currency: any) => {
        const { Currency, balance } = currency;
        const tokenPrice = await getTokenPriceUSDTSingle(
          Currency.SmartContract,
          network
        );
        console.log(`Price of ${Currency.SmartContract} = ${tokenPrice}`);
        const value = parseFloat(tokenPrice) * parseFloat(balance);
        return value;
      });
      const currencyResults = await Promise.all(currencyPromises);
      sum = currencyResults.reduce((acc, value) => acc + value, 0);
      console.log(`Total balance at ${network} in $: ${sum}`);
      return sum;
    });

    const networkResults = await Promise.all(requestPromises);
    const totalSum = networkResults.reduce((acc, value) => acc + value, 0);

    console.log(`Total balance across all networks in $: ${totalSum}`);

    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`Execution time: ${executionTime} ms`);
  } catch (error) {
    console.log(error);
  }
}
