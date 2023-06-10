import axios from "axios";
import { apiBitQuery } from "../constants";
import dotenv from "dotenv";
dotenv.config();

export async function getFirstTxHash(address: string, date: string) {
  try {
    const response = await axios.post(
      apiBitQuery,
      {
        query: `
        query getFirstTxData {
            ethereum(network: ethereum) {
              transactions(
                txSender: {is: "${address}"}
                time: {is: "${date}"}
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
    const time = response.data.data.ethereum;
    console.log(time);
  } catch (error) {
    console.error(error);
  }
}
