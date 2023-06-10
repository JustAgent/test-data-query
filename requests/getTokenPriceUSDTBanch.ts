import axios from "axios";
import { apiBitQuery } from "../constants";
import dotenv from "dotenv";
dotenv.config();

export async function getTokenPriceUSDTBanch(
  addresses: string[],
  network: string
) {
  const usdtAddress =
    network === "eth"
      ? "0xdac17f958d2ee523a2206206994597c13d831ec7"
      : "0x55d398326f99059fF775485246999027B3197955";
  const actualNetwork = network === "eth" ? "ethereum" : network;
  const formattedAddresses = [];
  for (const address of addresses) {
    let token = address;
    if (network === "eth" && token === "0x") {
      token = "ETH";
    }
    if (network === "bsc" && token === "0x") {
      token = "BNB";
    }
    if (token === "0xd31d2c3c4619e6bdde0f6248add5e3fadd494aa9") {
      let i = addresses.indexOf(token);
      if (i > -1) {
        addresses.splice(i, 1); // 2nd parameter means remove one item only
      }
      continue;
    }
    formattedAddresses.push(token);
  }
  console.log(formattedAddresses);
  const query = `query getTokenPriceUSDT($limit: Int, $usdtAddress: String ) {
    ethereum(network: ${actualNetwork}) {
      dexTrades(
        baseCurrency: { in: ["BNB"] }
        quoteCurrency: { is: $usdtAddress }
        options: { desc: ["block.height", "transaction.index"], limit: $limit }
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
  
  `;
  const variables = {
    strings: [formattedAddresses[4]],
    actualNetwork: `${actualNetwork}`,
    limit: 10,
    usdtAddress: usdtAddress,
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
    let price = response.data;
    console.log(price);
    if (!price) {
      price = 0;
    }
    return price;
  } catch (error) {
    console.error(error);
  }
}
