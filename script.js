const SHEET_NAME = "ENTETE";

fetch('https://script.google.com/macros/s/AKfycbwoTyj8mpGYPfWCOxszGA-SPYTSBsJbJoHyFKgIr-b5xSAu-CO9pgE3bCebLGAWCVDnPg/exec?page=api')
  .then(res => res.json())
  .then(displayProduits);
  
  
  return HtmlService
    .createHtmlOutputFromFile("index")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function doGet(e) {
  const page = e && e.parameter && e.parameter.page ? e.parameter.page : null;

  // Endpoint DATA pour GitHub Pages (retourne le JSON de la feuille)
  if (page === "data") {
    try {
      const data = getData();
      return ContentService
        .createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      return ContentService
        .createTextOutput(JSON.stringify({error: err.message}))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  // Par défaut, message d'accueil de l'API
  return HtmlService
    .createHtmlOutput("RubMax Servicos API en ligne")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Inclure un fichier HTML (optionnel, utile pour admin ou index)
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}










function getWhatsAppNumber() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  return sheet.getRange("A7").getValue(); // Récupère la valeur de la cellule A7
}

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
    .filter(row => row[0]) // s'assurer que le type existe
    .map(row => ({
      type: row[0],
      img: formatImage(row[1]),
      nom: row[2],
      description: row[3],
      prix: row[4]
    }));

  return { entete, services };
}

// Convertit les liens Google Drive ou autres vers un format utilisable
function formatImage(url) {
  if (!url) return "https://iili.io/F3yIWCb.png"; // Image par défaut
  if (url.includes("drive.google.com")) {
    const match = url.match(/\/file\/d\/([^/]+)/);
    return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
  }
  return url;
}
