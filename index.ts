import { ethers } from "ethers";
import { getAllTransactions } from "./requests/getAllTransactions";

async function main() {
  const address = "0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5";
  await getAllTransactions(address);
}

main().catch((err) => {
  console.error(err);
});
