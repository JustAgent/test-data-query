import axios from "axios";
import { apiBitStream, apiBitQuery } from "../constants";
import dotenv from "dotenv";
dotenv.config();

export async function getBalanceHistory() {
  try {
    const response = await axios.post(
      apiBitQuery,
      // Date can be commented
      {
        query: `
        query getBalanceHistory {
            ethereum(network: ethereum) {
              address(address: {is: "0x3f09b08cebe5637ca134c5a20870362367bfd45e"}) {
                balances(currency: {is: "ETH"}, 
                  date: {since: "2023-04-18", till: "2024-04-18"}
                  ) 
                  {
                  currency {
                    symbol
                  }
                  value
                  history {
                    timestamp
                    value
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
    const res = response.data.data.ethereum.address[0].balances[0].history;
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
}
