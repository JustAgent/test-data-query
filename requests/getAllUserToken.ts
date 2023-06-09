import axios from "axios";
import { apiBitStream, apiBitQuery } from "../constants";
import dotenv from "dotenv";
import { saveToCSV5 } from "../utils/saveToCSV";
dotenv.config();

export async function getAllUserTokens(
  address: string,
  network: string,
  flag?: boolean
) {
  const startTime = performance.now();

  try {
    console.log(`Network: ${network}`);
    const response = await axios.post(
      apiBitStream,
      {
        query: `
        query getAllUserTokens {
            EVM(dataset: combined, network: ${network}) {
              BalanceUpdates(
                where: {BalanceUpdate: {Address: {is: "${address}"}}, Currency: {Fungible: true}}
                orderBy: {descendingByField: "balance"}
              ) {
                Currency {
                  SmartContract
                  Name
                }
                balance: sum(of: BalanceUpdate_Amount)
              }
            }
          }
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.API_BITQUERY,
        },
      }
    );
    const currencies = response.data.data.EVM.BalanceUpdates;
    console.log(`All user's tokens: `, currencies);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`Execution time: ${executionTime} ms`);
    if (flag) {
      const filePath = `logs/5.csv`;
      saveToCSV5(filePath, currencies, executionTime);
    }

    return currencies;
  } catch (error) {
    console.error(error);
  }
}
