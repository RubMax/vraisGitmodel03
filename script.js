
// https://script.google.com/macros/s//exec
const apiURL = 'https://script.google.com/macros/s/AKfycbwJQO-cpguteF38PtytHKWWqZyoUR61tQoRz4Vyzh98vT4tcItVxZ00TOdcE9ihjmjj/exec?page=data';


const API_URL = 'https://script.google.com/macros/s/AKfycbwJQO-cpguteF38PtytHKWWqZyoUR61tQoRz4Vyzh98vT4tcItVxZ00TOdcE9ihjmjj/exec?page=data';

let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installAppBtn').style.display = 'block';
});

document.getElementById('installAppBtn').addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        document.getElementById('installAppBtn').style.display = 'none';
      }
      deferredPrompt = null;
    });
  }
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

fetch(API_URL)
  .then(res => res.json())
  .then(renderPage)
  .catch(err => alert("Erreur de chargement des données : " + err.message));

function renderPage(data) {
  const entete = data.entete;

  document.getElementById("nomEntreprise").textContent = entete.nomEntreprise;
  document.getElementById("slogant").textContent = entete.slogant;
  document.getElementById("logo").src = entete.imgLogo;
  document.getElementById("mainHeader").style.backgroundImage = `url('${entete.imgEntete}')`;
  document.getElementById("adresse").textContent = entete.adresse;
  document.getElementById("whatsapp").textContent = entete.whatsapp;
  document.getElementById("email").textContent = entete.email;
  document.getElementById("telFix").textContent = entete.telFix || "";
  document.getElementById("domaine").textContent = entete.domaine || "";

  const container = document.getElementById("servicesContainer");
  container.innerHTML = "";
  data.services.forEach(service => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${service.nom}</h3>
      <img src="${service.img}" alt="${service.nom}">
      <p>${service.description}</p>
      <p><strong>Prix:</strong> R$ ${service.prix}</p>
    `;
    container.appendChild(card);
  });
}
