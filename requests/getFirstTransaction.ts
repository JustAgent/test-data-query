import axios from "axios";
import { apiBitQuery } from "../constants";
import dotenv from "dotenv";
import { getFirstTxHash } from "./getFirstTxhash";
dotenv.config();

export async function getFirstTxTime(address: string) {
  const startTime = performance.now();

  const query = `
  query getFirstTxData($address: String) {
      ethereum(network: ethereum) {
        addressStats(address: {is: $address}) {
          address {
            firstTxAt {
              iso8601
            }
          }
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

    const time = await response.data.data.ethereum.addressStats[0].address
      .firstTxAt.iso8601;
    console.log(`Time: ${time}`);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(executionTime);
    // const hash: any = await getFirstTxHash(address, time);
    // console.log(`Tx hash: ${hash}`);
  } catch (error) {
    console.error(error);
  }
}
