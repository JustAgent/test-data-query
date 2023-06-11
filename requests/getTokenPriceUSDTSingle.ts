import axios from "axios";
import { apiBitQuery } from "../constants";
import dotenv from "dotenv";
dotenv.config();

export async function getTokenPriceUSDTSingle(
  address: string,
  network: string
) {
  let token = address;
  let usdtAddress = "0x55d398326f99059fF775485246999027B3197955"; // BNB usdt
  let actualNetwork = network;

  if (network === "eth") {
    actualNetwork = "ethereum";
    usdtAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
    if (token == "0x") {
      token = "ETH";
    }
  }

  if (network === "bsc") {
    usdtAddress = "0x55d398326f99059fF775485246999027B3197955";
    if (token == "0x") {
      token = "BNB";
    }
  }

  if (token === "0xd31d2c3c4619e6bdde0f6248add5e3fadd494aa9") {
    return 0;
  }
  try {
    const response = await axios.post(
      apiBitQuery,
      {
        query: `query getTokenPriceUSDT {
          ethereum(network: ${actualNetwork}) {
            dexTrades(
              baseCurrency: { is: "${token}" }
              quoteCurrency: { is: "${usdtAddress}" }
              options: { desc: ["block.height", "transaction.index"], limit: 1 }
            ) {
              block {
                height
                timestamp {
                  time(format: "%Y-%m-%d %H:%M:%S")
                }
              }
              transaction {
                index
              }
              baseCurrency {
                symbol
              }
              quoteCurrency {
                symbol
              }
              quotePrice
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
    let price = response.data.data.ethereum.dexTrades[0]?.quotePrice;
    if (!price) {
      price = 0;
    }

    return price;
  } catch (error) {
    console.error(error);
  }
}
