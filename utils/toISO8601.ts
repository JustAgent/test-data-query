export function convertToISO8601DateTime(datetimeString: string): string {
  console.log(datetimeString);
  const modifiedString = datetimeString.replace(" ", "T") + "Z";
  return modifiedString;
}
