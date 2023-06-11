const query = `{
    ethereum {
      dexTrades(
        options: {desc: "block.height"}
        makerOrTaker: {is: "0x3f09b08cebe5637ca134c5a20870362367bfd45e"}
      ) {
        transaction {
          hash
          gasValue
          gasPrice
          gas
        }
        smartContract {
          address {
            address
          }
          contractType
          currency {
            name
          }
        }
        tradeIndex
        date {
          date
        }
        block {
          height
        }
        buyAmount
        buyAmountInUsd: buyAmount(in: USD)
        buyCurrency {
          symbol
          address
        }
        sellCurrency {
          symbol
          address
        }
        tradeAmount(in: ETH)
        transaction {
          hash
          gasValue
          gasPrice
          gas
        }
        sellAmountInUsd: sellAmount(in: USD)
      }
    }
  }
  `;

export async function getTokenPriceUSDTBanch(address: string) {
  const query = `{
      ethereum {
        dexTrades(
          options: {desc: "block.height"}
          makerOrTaker: {is: "0x3f09b08cebe5637ca134c5a20870362367bfd45e"}
        ) {
          transaction {
            hash
            gasValue
            gasPrice
            gas
          }
          smartContract {
            address {
              address
            }
            contractType
            currency {
              name
            }
          }
          tradeIndex
          date {
            date
          }
          block {
            height
          }
          buyAmount
          buyAmountInUsd: buyAmount(in: USD)
          buyCurrency {
            symbol
            address
          }
          sellCurrency {
            symbol
            address
          }
          tradeAmount(in: ETH)
          transaction {
            hash
            gasValue
            gasPrice
            gas
          }
          sellAmountInUsd: sellAmount(in: USD)
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
