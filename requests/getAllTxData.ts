import axios from "axios";
import { apiBitQuery } from "../constants";

export async function getAllTxData(address: string) {
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
    makerOrTrader: address,
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
    let res = response.data;
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}
