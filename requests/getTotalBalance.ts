import { getAllUserTokens } from "./getAllUserToken";
import { getTokenPriceUSDTSingle } from "./getTokenPriceUSDTSingle";
import { saveToCSV2 } from "../utils/saveToCSV";

export async function getTotalBalance(address: string, networks: string[]) {
  const startTime = performance.now();
  try {
    const requestPromises = networks.map(async (network) => {
      const currencies = await getAllUserTokens(address, network);
      let sum = 0;
      const currencyPromises = currencies.map(async (currency: any) => {
        const { Currency, balance } = currency;
        return new Promise<number>(async (resolve) => {
          setTimeout(async () => {
            try {
              const tokenPrice = await getTokenPriceUSDTSingle(
                Currency.SmartContract,
                network
              );
              console.log(`Price of ${Currency.SmartContract} = ${tokenPrice}`);
              const value = parseFloat(tokenPrice) * parseFloat(balance);
              resolve(value);
            } catch (error) {
              console.error(error);
              resolve(0); // Resolve with a default value in case of an error
            }
          }, 500);
        });
      });

      const currencyResults = await Promise.allSettled(currencyPromises);
      const fulfilledValues = currencyResults
        .filter((result) => result.status === "fulfilled")
        .map((result) => (result as PromiseFulfilledResult<number>).value);

      sum = fulfilledValues.reduce((acc, value) => acc + value, 0);
      console.log(`Total balance at ${network} in $: ${sum}`);
      const data = [{ network, sum }];
      const filePath = `logs/2_${network}.csv`;
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      console.log(`Execution time: ${executionTime} ms`);
      saveToCSV2(filePath, data, executionTime);
      return sum;
    });

    const networkResults = await Promise.allSettled(requestPromises);
    const fulfilledSums = networkResults
      .filter((result) => result.status === "fulfilled")
      .map((result) => (result as PromiseFulfilledResult<number>).value);

    const totalSum = fulfilledSums.reduce((acc, value) => acc + value, 0);

    console.log(`Total balance across all networks in $: ${totalSum}`);
  } catch (error) {
    console.log(error);
  }
}
