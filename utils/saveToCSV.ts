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
