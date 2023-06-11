import axios from "axios";
import { apiBitStream, apiBitQuery } from "../constants";
import dotenv from "dotenv";
dotenv.config();

export async function getAllUserTokens(address: string, network: string) {
  try {
    console.log(`Network: ${network}`);
    const response = await axios.post(
      apiBitStream,
      {
        query: `
        query getAllUserTokens {
            EVM(dataset: combined, network: ${network}) {
              BalanceUpdates(
                where: {BalanceUpdate: {Address: {is: "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5"}}, Currency: {Fungible: true}}
                orderBy: {descendingByField: "balance"}
              ) {
                Currency {
                  SmartContract
                  Name
                }
                balance: sum(of: BalanceUpdate_Amount)
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
    const currencies = response.data.data.EVM.BalanceUpdates;
    console.log(`All user's tokens: `, currencies);
    return currencies;
  } catch (error) {
    console.error(error);
  }
}
