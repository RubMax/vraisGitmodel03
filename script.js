const API_URL = "https://script.google.com/macros/s/AKfycbwJQO-cpguteF38PtytHKWWqZyoUR61tQoRz4Vyzh98vT4tcItVxZ00TOdcE9ihjmjj/exec?page=data";

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    const entete = data.entete;

    document.getElementById("nomEntreprise").textContent = entete.nomEntreprise;
    document.getElementById("slogant").textContent = entete.slogant;
    document.getElementById("logo").src = entete.imgLogo;
    const header = document.getElementById("mainHeader");
    if (header) header.style.backgroundImage = `url('${entete.imgEntete}')`;

    document.getElementById("adresse").textContent = entete.adresse;
    document.getElementById("whatsapp").textContent = entete.whatsapp;
    document.getElementById("email").textContent = entete.email;
    document.getElementById("telFix").textContent = entete.telFix;
    document.getElementById("domaine").textContent = entete.domaine;

    const container = document.getElementById("servicesContainer");
    container.innerHTML = "";

    const groupes = {};

    // Grouper les services par type
    data.services.forEach(service => {
      if (!groupes[service.type]) groupes[service.type] = [];
      groupes[service.type].push(service);
    });

    // Affichage par groupe
    Object.keys(groupes).forEach(type => {
      const typeTitle = document.createElement("h2");
      typeTitle.textContent = type;
      typeTitle.style.textAlign = "center";
      typeTitle.style.color = "#007BFF";
      typeTitle.style.fontWeight = "bold";
      container.appendChild(typeTitle);

      groupes[type].forEach(service => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h3>${service.nom}</h3>
          <img src="${service.img}" alt="${service.nom}" style="width:100%;max-height:200px;object-fit:cover;">
          <p>${service.description}</p>
          <p><strong>Prix:</strong> R$ ${service.prix}</p>
        `;
        container.appendChild(card);
      });
    });
  })
  .catch(err => alert("Erreur: " + err.message));

// PWA install prompt
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById("installAppBtn").style.display = "block";
});

document.getElementById("installAppBtn").addEventListener("click", () => {
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(choice => {
    if (choice.outcome === "accepted") {
      document.getElementById("installAppBtn").style.display = "none";
    }
    deferredPrompt = null;
  });
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
