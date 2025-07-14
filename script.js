const SHEET_NAME = "Produits";

/* Fetche obigatoire avec lien app scrip +?page=api */
fetch('https://script.google.com/macros/s/AKfycbwoTyj8mpGYPfWCOxszGA-SPYTSBsJbJoHyFKgIr-b5xSAu-CO9pgE3bCebLGAWCVDnPg/exec?page=api')
  .then(res => res.json())
  /* **********important fonctio affich************* */
  .then(displayProduits);
  
  
  return HtmlService
    .createHtmlOutputFromFile("index")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);


function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/*function getData() {
  try {
    ============== si cest diff ici il faut maudifier================
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const rows = sheet.getDataRange().getValues();
    rows.shift();
    return rows.map(r => ({
      section:     r[0],
      nom:         r[1],
      image:       r[2],
      description: r[3],
      prix:        (typeof r[4] === 'number') ? r[4].toString().replace('.', ',') : (r[4] || ""),
      tailles:     r[5] || "",
      code:        r[6] || "",
      pub:         r[7] || "", // Colonne H - contenu de la pub
      pubInterval: isNaN(r[8]) ? 25000 : r[8] * 1000 // Colonne I - intervalle en secondes
    }));
  } catch (err) {
    throw new Error("Erreur getData: " + err.message);
  }
}

function saveData(data) {*/
 
