const SHEET_NAME = "ENTETE";

/**
 * Point d’entrée principal : gère les requêtes GET
 */
function doGet(e) {
  const page = e?.parameter?.page || null;

  // Endpoint pour récupérer les données en JSON (ex: ?page=data)
  if (page === "data") {
    try {
      const data = getData();
      return ContentService
        .createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: err.message }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  // Par défaut : retourne la page HTML index (utile pour testing ou Admin)
  return HtmlService
    .createHtmlOutputFromFile("index")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


/**
 * Récupère les données de la feuille ENTETE pour affichage dans GitHub
 */
function getData() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const rows = sheet.getDataRange().getValues();
    rows.shift(); // Enlève l’en-tête

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


/**
 * Récupère les données d’en-tête + services pour une page personnalisée (index)
 */
function getIndexData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  const entete = {
    nomEntreprise: sheet.getRange("A3").getValue(),
    imgEntete: formatImage(sheet.getRange("A5").getValue()),
    imgLogo: formatImage(sheet.getRange("A7").getValue()),
    slogant: sheet.getRange("A9").getValue(),
    adresse: sheet.getRange("A11").getValue(),
    telFix: sheet.getRange("A13").getValue(),
    whatsapp: sheet.getRange("A15").getValue(),
    email: sheet.getRange("A17").getValue(),
    domaine: sheet.getRange("A19").getValue()
  };

  const data = sheet.getRange("B3:F" + sheet.getLastRow()).getValues();
  const services = data
    .filter(row => row[0]) // Vérifie que le type existe
    .map(row => ({
      type: row[0],
      img: formatImage(row[1]),
      nom: row[2],
      description: row[3],
      prix: row[4]
    }));

  return { entete, services };
}


/**
 * Format les URLs d'image (Drive ou lien direct)
 */
function formatImage(url) {
  if (!url) return "https://iili.io/F3yIWCb.png"; // Image par défaut
  if (url.includes("drive.google.com")) {
    const match = url.match(/\/file\/d\/([^/]+)/);
    return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
  }
  return url;
}


/**
 * Récupère le numéro WhatsApp (depuis cellule A7)
 */
function getWhatsAppNumber() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  return sheet.getRange("A7").getValue();
}


/**
 * Inclut un fichier HTML dans un autre (ex: pour `index.html`)
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
