import axios from "axios";
import { apiBitQuery } from "../constants";
import dotenv from "dotenv";
import { convertToISO8601DateTime } from "../utils/toISO8601";
import { getFirstTxHash } from "./getFirstTxhash";
dotenv.config();

export async function getFirstTxTime(address: string) {
  try {
    const response = await axios.post(
      apiBitQuery,
      {
        query: `
        query getFirstTxData {
            ethereum(network: ethereum) {
              addressStats(address: {is: "${address}"}) {
                address {
                  firstTxAt {
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
    const time = await response.data.data.ethereum.addressStats[0].address
      .firstTxAt;
    const timeISO = convertToISO8601DateTime(time.time);
    console.log(timeISO);
    const hash: any = await getFirstTxHash(address, timeISO);
  } catch (error) {
    console.error(error);
  }
}
