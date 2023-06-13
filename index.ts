import { getAllUserTokens } from "./requests/getAllUserToken";
import { getFirstTxTime } from "./requests/getFirstTransaction";
import { getTotalBalance } from "./requests/getTotalBalance";
import { getBalanceHistory } from "./requests/getBalanceHistory";
import { getAllTxData } from "./requests/getAllTxData";

async function main() {
  // const address = "0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5";
  const address = "0x3f09b08cebe5637ca134c5a20870362367bfd45e";
  // 1)
  await getFirstTxTime(address);
  // 2)
  // await getTotalBalance(address, ["eth", "bsc"]);
  // 3)
  // await getBalanceHistory(address);
  // 4)
  // await getTotalBalance(address, ["eth", "bsc"]);
  // 5)
  // await getAllUserTokens(address, "eth", true);
  // 6)
  // await getAllTxData(address);
}

main().catch((err) => {
  console.error(err);
});
