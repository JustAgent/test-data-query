import axios from "axios";
import { apiBitQuery } from "../constants";
import dotenv from "dotenv";
dotenv.config();

export async function getFirstTxHash(address: string, date: string) {
  try {
    let method = "txSender";
    let query = `
      query getFirstTxData {
        ethereum(network: ethereum) {
          transactions(
            ${method}: { is: "${address}" }
            time: { is: "${date}" }
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
    `;

    const response = await axios.post(
      apiBitQuery,
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.API_BITQUERY,
        },
      }
    );

    let hash = response.data.data.ethereum.transactions[0]?.hash;

    if (typeof hash === "undefined") {
      method = "txTo";
      query = `
        query getFirstTxData {
          ethereum(network: ethereum) {
            transactions(
              ${method}: { in: ["${address}"] }
              time: { is: "${date}" }
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
      `;

      const updatedResponse = await axios.post(
        apiBitQuery,
        { query },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.API_BITQUERY,
          },
        }
      );

      hash = updatedResponse.data.data.ethereum.transactions[0]?.hash;
    }

    return hash;
  } catch (error) {
    console.error(error);
  }
}
