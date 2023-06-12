import axios from "axios";
import { apiBitQuery } from "../constants";
import dotenv from "dotenv";
dotenv.config();

export async function getBalanceHistory(address: string) {
  const startTime = performance.now();
  try {
    const query = `
    query getBalanceHistory($address: String) {
        ethereum(network: ethereum) {
          address(address: {is: $address}) {
            balances(currency: {is: "ETH"}, 
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
      
    `;
    const variables = {
      address: address,
    };
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
    const res = response.data.data.ethereum.address[0].balances[0].history;
    console.log(res);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`Execution time: ${executionTime} ms`);
  } catch (error) {
    console.error(error);
  }
}
