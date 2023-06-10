import axios from "axios";

export async function getWalletAssets(walletAddress: string) {
  const apiUrl = "https://graphql.bitquery.io/";
  const apiKey = process.env.API_BITQUERY;

  const query = `
    query GetWalletAssets($walletAddress: String!) {
      ethereum(network: ethereum) {
        address(address: { is: $walletAddress }) {
          balances {
            currency {
              symbol
              name
            }
            value
          }
        }
      }
      bsc(network: bsc) {
        address(address: { is: $walletAddress }) {
          balances {
            currency {
              symbol
              name
            }
            value
          }
        }
      }
      polygon(network: polygon) {
        address(address: { is: $walletAddress }) {
          balances {
            currency {
              symbol
              name
            }
            value
          }
        }
      }
      // Add more blockchains as needed
    }
  `;

  try {
    const response = await axios.post(
      apiUrl,
      {
        query,
        variables: {
          walletAddress: walletAddress.toLowerCase(),
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
      }
    );

    const ethereumBalances = response.data.data.ethereum.address.balances;
    const bscBalances = response.data.data.bsc.address.balances;
    const polygonBalances = response.data.data.polygon.address.balances;
    // Add more blockchain balances as needed

    console.log("Wallet Assets:");
    console.log("Ethereum:");
    ethereumBalances.forEach((balance: any) => {
      console.log(`${balance.currency.symbol}: ${balance.value}`);
    });

    console.log("BSC:");
    bscBalances.forEach((balance: any) => {
      console.log(`${balance.currency.symbol}: ${balance.value}`);
    });

    console.log("Polygon:");
    polygonBalances.forEach((balance: any) => {
      console.log(`${balance.currency.symbol}: ${balance.value}`);
    });

    // Output balances for other blockchains
  } catch (error: any) {
    console.error("Error fetching wallet assets:", error.message);
  }
}

// Example usage
const walletAddress = "YOUR_WALLET_ADDRESS";
getWalletAssets(walletAddress);
