import fs from "fs";

export function createFolderIfNotExists(folderPath: string) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Created folder: ${folderPath}`);
  } else {
    console.log(`Folder already exists: ${folderPath}`);
  }
}
