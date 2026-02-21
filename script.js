const npcs = [
  {
    id: "gundren",
    name: "Gundren Busca-pedra",
    title: "Anão",
    image: "Personagens/Gundren.png",
    location: "Desaparecido / Presumivelmente capturado (rastros levaram até o Esconderijo Dente Fino)",
    notes: [
      "A Missão: Contratou o grupo em Neverwinter para escoltar uma carroça com suprimentos de mineração e provisões até a cidade de Fandalin. O destino da entrega é a loja \"Provisões Barthen\".",
      "Pagamento: Prometeu 10 peças de ouro para cada membro do grupo após a entrega segura da carga.",
      "Família: Pertence a uma família de mineradores e mencionou ter outros dois irmãos.",
      "Atitude: Estava visivelmente entusiasmado e um pouco reservado, afirmando que ele e os irmãos encontraram \"algo grande\" recentemente.",
      "A Emboscada: Gundren e sua escolta, Sildar Invernália, foram emboscados na Trilha Trijavali por goblins. Seus cavalos foram encontrados mortos e saqueados.",
      "Status Atual: Desaparecido. Os rastros no local da emboscada indicavam que dois corpos foram arrastados para dentro da floresta, levando o grupo até o atual Esconderijo Boca Escarpada. O paradeiro exato de Gundren e Sildar ainda é desconhecido."
    ]
  },
  {
    id: "sildar",
    name: "Sildar Invernalia",
    title: "Humano",
    location: "Desaparecido/Capturado (rastros levaram até a entrada do esconderijo)",
    notes: [
      "O Papel: É um guerreiro humano que viajava a cavalo junto de Gundren, partindo à frente da carroça do grupo. Foi citado como a escolta de confiança do anão para cuidar dos negócios na cidade.",
      "A Emboscada: Sildar e Gundren foram emboscados na Trilha Trijavali por goblins. O cavalo de Sildar foi encontrado morto e saqueado na beira da estrada, junto ao cavalo de Gundren.",
      "Status Atual: Desaparecido/Capturado. Rastros no local da emboscada indicaram que dois corpos de tamanho humano (ele e Gundren) foram arrastados para dentro da floresta, levando o grupo até a entrada do esconderijo."
    ]
  },
  {
    id: "goblin-estranho",
    name: "Goblin Estranho",
    title: "Goblin",
    image: "Personagens/GoblinEstranho.webp",
    location: "Arredores do local de emboscada, na Trilha Trijavali",
    notes: [
      "Não parece pertencer ao grupo dos goblins Dente Fino",
      "Status Atual: Paradeiro incerto."
    ]
  },
  { id: "slot-4", empty: true },
  { id: "slot-5", empty: true },
  { id: "slot-6", empty: true },
  { id: "slot-7", empty: true },
  { id: "slot-8", empty: true }
];

const grid = document.getElementById("npcGrid");
const panel = document.getElementById("detailsPanel");
const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  if (!themeToggle) return;
  themeToggle.textContent = theme === "dark" ? "Tema claro" : "Tema escuro";
  themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
}

function getInitialTheme() {
  const storedTheme = localStorage.getItem("npc-theme");
  if (storedTheme === "light" || storedTheme === "dark") return storedTheme;
  return "light";
}

const initialTheme = getInitialTheme();
setTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme") || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("npc-theme", nextTheme);
  });
}

function renderDetails(npc) {
  const notesMarkup = npc.notes
    .map((note) => `<li>${note}</li>`)
    .join("");
  const portraitMarkup = npc.image
    ? `<div class="lore-portrait-card"><img class="npc-portrait" src="${npc.image}" alt="Retrato de ${npc.name}"></div>`
    : "";

  panel.innerHTML = `
    <p class="panel-kicker">Crônica</p>
    <h2>${npc.name}</h2>
    ${portraitMarkup}
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
