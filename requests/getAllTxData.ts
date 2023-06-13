import axios from "axios";
import { apiBitQuery } from "../constants";
import dotenv from "dotenv";
import { saveToCSV6 } from "../utils/saveToCSV";
dotenv.config();

export async function getAllTxData(address: string) {
  const startTime = performance.now();
  const query = `query ($address: String) {
    ethereum(network: ethereum) {
      dexTrades(options: {desc: "block.height"}, makerOrTaker: {is: $address}) {
        transaction {
          hash
          gasValue
          gasPrice
          gas
        }
        smartContract {
          address {
            address
          }
          contractType
          currency {
            name
          }
        }
        tradeIndex
        block {
          height
          timestamp {
            time
          }
        }
        buyAmount
        buyAmountInUsd: buyAmount(in: USD)
        buyCurrency {
          symbol
          address
        }
        sellCurrency {
          symbol
          address
        }
        tradeAmount(in: ETH)
        transaction {
          hash
          gasValue
          gasPrice
          gas
        }
        sellAmountInUsd: sellAmount(in: USD)
      }
    }
  }
    `;

  const variables = {
    address: address,
  };

  try {
    const response = await axios.post(
      apiBitQuery,
      {
        query: query,
        variables: variables,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.API_BITQUERY,
        },
      }
    );
    let res = response.data.data.ethereum.dexTrades;
    console.log(res);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    const filePath = `logs/6.csv`;
    saveToCSV6(filePath, res, executionTime);
    console.log(`Execution time: ${executionTime} ms`);

    return res;
  } catch (error: any) {
    console.error(error.status);
  }
}
