import { ethers } from "ethers";
import { getWalletAssets } from "./requests/getAllTokensCrosschain";
import { getAllTransactions } from "./requests/getAllTransactions";
import { getAllUserTokens } from "./requests/getAllUserToken";
import { getFirstTxTime } from "./requests/getFirstTransaction";
import { getTokenPriceUSDTSingle } from "./requests/getTokenPriceUSDTSingle";
import { getTokenPrice } from "./requests/getTokenPrice";
import { getTotalBalance } from "./requests/getTotalBalance";
import { getBalanceHistory } from "./requests/getBalanceHistory";

async function main() {
  const address = "0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5";
  //   await getAllTransactions(address);
  await getFirstTxTime(address);
  //   await getAllUserTokens(address);
  //   await getTotalBalance(address, ["eth", "bsc"]);
  //   await getTokenPriceUSDT("0xF04eDcD6e2764dc2574413f31156785605f62d78")
  //   await getBalanceHistory();
}

main().catch((err) => {
  console.error(err);
});
