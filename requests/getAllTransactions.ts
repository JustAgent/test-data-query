import axios from "axios";
import { apiBitQuery } from "../constants";
import dotenv from "dotenv";
dotenv.config();

export async function getAllTransactions(address: string) {
  try {
    const limit = 25000;
    let offset = 0;

    let totalTransactions: any = [];

    while (true) {
      console.log(offset);
      const response = await axios.post(
        apiBitQuery,
        {
          query: `
        query getAllTransactions {
          ethereum(network: ethereum) {
            transactions(
              txSender: { is: "${address}" }
              options: { limit: ${limit}, offset: ${offset} }
            ) {
                hash
                block {
                  timestamp {
                    time
                  }
                }
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

      const transactions = response.data.data.ethereum.transactions;
      totalTransactions = totalTransactions.concat(transactions);

      if (transactions.length < limit) {
        break;
      }

      offset += limit;
    }

    console.log(totalTransactions.length);
    console.log(totalTransactions[totalTransactions.length - 1]);
  } catch (error) {
    console.error(error);
  }
}
