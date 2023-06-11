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
                    iso8601
                    
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
      .firstTxAt.iso8601;
    console.log(time);
    const hash: any = await getFirstTxHash(address, time);
  } catch (error) {
    console.error(error);
  }
}