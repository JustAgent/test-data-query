import { createObjectCsvWriter } from "csv-writer";

export function saveToCSV1(filePath: string, data: any[]) {
  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: [{ id: "time", title: "Time" }],
  });

  csvWriter
    .writeRecords(data)
    .then(() => {
      console.log(`Saved data to CSV file: ${filePath}`);
    })
    .catch((error: any) => {
      console.error("Error occurred while saving data to CSV:", error);
    });
}

export function saveToCSV2(
  filePath: string,
  data: any[],
  executionTime: number
) {
  const dataWithExecutionTime = [
    ...data,
    { network: "Execution Time", sum: executionTime },
  ];

  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: [
      { id: "network", title: "Network" },
      { id: "sum", title: "Sum" },
    ],
  });

  csvWriter
    .writeRecords(dataWithExecutionTime)
    .then(() => {
      console.log(`Saved data to CSV file: ${filePath}`);
    })
    .catch((error: any) => {
      console.error("Error occurred while saving data to CSV:", error);
    });
}

export function saveToCSV3(
  filePath: string,
  data: any[],
  executionTime: number
) {
  console.log("Data to be saved:", data); // Debug logging

  const dataWithExecutionTime = [
    ...data,
    { timestamp: "Execution Time", value: executionTime },
  ];

  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: [
      { id: "timestamp", title: "Timestamp" },
      { id: "value", title: "Value" },
    ],
  });

  csvWriter
    .writeRecords(dataWithExecutionTime)
    .then(() => {
      console.log(`Saved data to CSV file: ${filePath}`);
    })
    .catch((error: any) => {
      console.error("Error occurred while saving data to CSV:", error);
    });
}

export function saveToCSV5(
  filePath: string,
  data: any[],
  executionTime: number
) {
  console.log("Data to be saved:", data); // Debug logging

  const dataWithExecutionTime = data.map((item: any) => ({
    name: item.Currency.Name,
    smartContract: item.Currency.SmartContract,
    balance: item.balance,
  }));

  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: [
      { id: "name", title: "Name" },
      { id: "smartContract", title: "Smart Contract" },
      { id: "balance", title: "Balance" },
    ],
  });

  csvWriter
    .writeRecords(dataWithExecutionTime)
    .then(() => {
      console.log(`Saved data to CSV file: ${filePath}`);
    })
    .catch((error: any) => {
      console.error("Error occurred while saving data to CSV:", error);
    });
}

export function saveToCSV6(
  filePath: string,
  data: any[],
  executionTime: number
) {
  console.log("Data to be saved:", data); // Debug logging

  const dataWithExecutionTime = data.map((item: any) => ({
    hash: item.transaction.hash,
    gasValue: item.transaction.gasValue,
    gasPrice: item.transaction.gasPrice,
    gas: item.transaction.gas,
    smartContract: item.smartContract.address.address,
    contractType: item.smartContract.contractType,
    currency: item.smartContract.currency.name,
    tradeIndex: item.tradeIndex,
    blockHeight: item.block.height,
    timestamp: item.block.timestamp.time,
    buyAmount: item.buyAmount,
    buyAmountInUsd: item.buyAmountInUsd,
    buyCurrencySymbol: item.buyCurrency.symbol,
    buyCurrencyAddress: item.buyCurrency.address,
    sellCurrencySymbol: item.sellCurrency.symbol,
    sellCurrencyAddress: item.sellCurrency.address,
    tradeAmount: item.tradeAmount,
    sellAmountInUsd: item.sellAmountInUsd,
  }));

  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: [
      { id: "hash", title: "Hash" },
      { id: "gasValue", title: "Gas Value" },
      { id: "gasPrice", title: "Gas Price" },
      { id: "gas", title: "Gas" },
      { id: "smartContract", title: "Smart Contract" },
      { id: "contractType", title: "Contract Type" },
      { id: "currency", title: "Currency" },
      { id: "tradeIndex", title: "Trade Index" },
      { id: "blockHeight", title: "Block Height" },
      { id: "timestamp", title: "Timestamp" },
      { id: "buyAmount", title: "Buy Amount" },
      { id: "buyAmountInUsd", title: "Buy Amount in USD" },
      { id: "buyCurrencySymbol", title: "Buy Currency Symbol" },
      { id: "buyCurrencyAddress", title: "Buy Currency Address" },
      { id: "sellCurrencySymbol", title: "Sell Currency Symbol" },
      { id: "sellCurrencyAddress", title: "Sell Currency Address" },
      { id: "tradeAmount", title: "Trade Amount" },
      { id: "sellAmountInUsd", title: "Sell Amount in USD" },
    ],
  });

  csvWriter
    .writeRecords(dataWithExecutionTime)
    .then(() => {
      console.log(`Saved data to CSV file: ${filePath}`);
    })
    .catch((error: any) => {
      console.error("Error occurred while saving data to CSV:", error);
    });
}
