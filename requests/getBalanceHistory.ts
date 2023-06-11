import axios from "axios";
import { apiBitQuery } from "../constants";
import dotenv from "dotenv";
dotenv.config();

export async function getBalanceHistory(address: string) {
  try {
    const query = `
    query getBalanceHistory($address: String) {
        ethereum(network: ethereum) {
          address(address: {is: $address}) {
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
  } catch (error) {
    console.error(error);
  }
}
