import { createObjectCsvWriter } from "csv-writer";

export function saveToCSV(filePath: string, data: any[]) {
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
