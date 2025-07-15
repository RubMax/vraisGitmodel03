
// https://script.google.com/macros/s//exec
const apiURL = 'https://script.google.com/macros/s/AKfycbwJQO-cpguteF38PtytHKWWqZyoUR61tQoRz4Vyzh98vT4tcItVxZ00TOdcE9ihjmjj/exec?page=data';



let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installAppBtn').style.display = 'block';
});

document.getElementById('installAppBtn').addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      document.getElementById('installAppBtn').style.display = 'none';
      deferredPrompt = null;
    });
  }
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

fetch(apiURL)
  .then(res => res.json())
  .then(renderPage)
  .catch(err => alert("Erreur : " + err.message));

function renderPage(data) {
  const ent = data.entete;

  document.getElementById("nomEntreprise").textContent = ent.nomEntreprise;
  document.getElementById("logo").src = ent.imgLogo;
  document.getElementById("slogant").textContent = ent.slogant;
  document.getElementById("adresse").textContent = ent.adresse;
  document.getElementById("telFix").textContent = ent.telFix;
  document.getElementById("whatsapp").textContent = ent.whatsapp;
  document.getElementById("email").textContent = ent.email;
  document.getElementById("domaine").textContent = ent.domaine;

  const container = document.getElementById("servicesContainer");
  container.innerHTML = "";
  data.services.forEach(service => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${service.nom}</h3>
      <img src="${service.img}" style="width:100%;max-height:200px;">
      <p>${service.description}</p>
      <strong>Prix: R$ ${service.prix}</strong>
    `;
    container.appendChild(card);
  });
}
