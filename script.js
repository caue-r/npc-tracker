const npcs = [
  {
    id: "gundren",
    name: "Gundren Busca-pedra",
    title: "Anão",
    image: "Personagens/Gundren.png",
    location: "A caminho de Phandalin (partiu à frente do grupo)",
    notes: [
      "A Missão: Contratou o grupo em Neverwinter para escoltar uma carroça com suprimentos de mineração e provisões até a cidade de Fandalin. O destino da entrega é a loja \"Provisões Barthen\".",
      "Pagamento: Prometeu 10 peças de ouro para cada membro do grupo após a entrega segura da carga.",
      "Família: Pertence a uma família de mineradores e mencionou ter outros dois irmãos.",
      "Atitude: Estava visivelmente entusiasmado e um pouco reservado, afirmando que ele e os irmãos encontraram \"algo grande\" recentemente.",
      "Status Atual: Partiu a cavalo antes da carroça para \"cuidar dos negócios\" na cidade, acompanhado por uma escolta, um guerreiro chamado Sildar Invernalia."
    ]
  },
  {
    id: "sildar",
    name: "Sildar Invernalia",
    title: "Humano",
    location: "A caminho de Phandalin (partiu à frente do grupo)",
    notes: [
      "É um guerreiro humano que viajava junto de Gundren.",
      "Foi citado como escolta de confiança durante a missão da carroça.",
      "Ainda não se tem muitas informações sobre seu passado ou objetivos."
    ]
  },
  { id: "slot-3", empty: true },
  { id: "slot-4", empty: true },
  { id: "slot-5", empty: true },
  { id: "slot-6", empty: true },
  { id: "slot-7", empty: true },
  { id: "slot-8", empty: true }
];

const grid = document.getElementById("npcGrid");
const panel = document.getElementById("detailsPanel");

function renderDetails(npc) {
  const notesMarkup = npc.notes
    .map((note) => `<li>${note}</li>`)
    .join("");

  panel.innerHTML = `
    <p class="panel-kicker">Crônica</p>
    <h2>${npc.name}</h2>
    <p><strong>Nome:</strong> ${npc.name}</p>
    <p><strong>Raça:</strong> ${npc.title}</p>
    <p><strong>Localização Conhecida:</strong> ${npc.location}</p>
    <p><strong>Anotações:</strong></p>
    <ul class="npc-notes">${notesMarkup}</ul>
  `;
}

function clearActiveCards() {
  const activeCards = document.querySelectorAll(".npc-card.active");
  activeCards.forEach((card) => card.classList.remove("active"));
}

npcs.forEach((npc) => {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "npc-card";

  if (npc.empty) {
    card.classList.add("empty");
    card.textContent = "Selado";
    card.disabled = true;
  } else {
    const cardImageMarkup = npc.image
      ? `<img class="card-portrait" src="${npc.image}" alt="Retrato de ${npc.name}">`
      : "";
    card.classList.toggle("no-image", !npc.image);
    card.innerHTML = `${cardImageMarkup}<span class="npc-name">${npc.name}</span>`;
    card.addEventListener("click", () => {
      clearActiveCards();
      card.classList.add("active");
      renderDetails(npc);
    });
  }

  grid.appendChild(card);
});
