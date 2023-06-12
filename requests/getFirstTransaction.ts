import axios from "axios";
import { apiBitQuery } from "../constants";
import dotenv from "dotenv";
import { createFolderIfNotExists } from "../utils/createFolderIfNotExists";
import { saveToCSV1 } from "../utils/saveToCSV";
import path from "path";
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

    const time =
      response.data.data.ethereum.addressStats[0].address.firstTxAt.iso8601;
    console.log(`Time: ${time}`);

    const folderPath = "./logs";
    createFolderIfNotExists(folderPath);

    const fileName = "1.csv";
    const filePath = path.join(folderPath, fileName);
    const data = [{ time }];

    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`Execution time: ${executionTime} ms`);

    data.push({ time: `Execution Time: ${executionTime} ms` });
    saveToCSV1(filePath, data);
  } catch (error) {
    console.error(error);
  }
}
