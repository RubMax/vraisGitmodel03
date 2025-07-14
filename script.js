const SHEET_NAME = "ENTETE";

function doGet(e) {
  if (e.parameter.page === "api") {
    const data = getData();
    return ContentService
      .createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return HtmlService
    .createHtmlOutputFromFile("index")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getData() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const rows = sheet.getDataRange().getValues();
    rows.shift(); // Enlève l'entête
    return rows.map(r => ({
      section:     r[0],
      nom:         r[1],
      image:       r[2],
      description: r[3],
      prix:        (typeof r[4] === 'number') ? r[4].toString().replace('.', ',') : (r[4] || ""),
      tailles:     r[5] || "",
      code:        r[6] || "",
      pub:         r[7] || "",
      pubInterval: isNaN(r[8]) ? 25000 : r[8] * 1000
    }));
  } catch (err) {
    throw new Error("Erreur getData: " + err.message);
  }
}
