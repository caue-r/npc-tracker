const npcs = [
  {
    id: "gundren",
    name: "Gundren Busca-pedra",
    title: "Anão",
    image: "Personagens/Gundren.png",
    location: "Castelo Dente Fino",
    notes: [
      "O Grande Segredo Revelado: Sildar contou ao grupo que Gundren e seus irmãos (Tharden e Nundro) descobriram a entrada para a lendária Caverna das Ondas Trovejantes, o local perdido da antiga Forja da Magia e do Pacto Fandelver.",
      "A Emboscada e \"A Aranha\": Gundren não foi capturado por acaso. Os goblins receberam ordens específicas de uma figura misteriosa conhecida apenas como \"A Aranha\" para capturar o anão e confiscar seus pertences.",
      "O Mapa Roubado: Gundren carregava um mapa com a localização exata e secreta da caverna. Os goblins roubaram esse mapa durante a emboscada na estrada.",
      "Status Atual: Desaparecido. Sildar ouviu que os goblins o levaram para o Castelo Dente Fino.",
      "Família: Pertence a uma família de mineradores e mencionou ter outros dois irmãos, de localizações, também, desconhecidas."
    ]
  },
  {
    id: "sildar",
    name: "Sildar Invernalia",
    title: "Humano",
    image: "Personagens/Sildar.png",
    location: "Salão do Chefe Municipal",
    notes: [
      "Resgate e Pagamento: Foi resgatado do Esconderijo Dente Fino e escoltado até Phandalin. Ele prometeu pagar 50 peças de ouro ao grupo pela escolta, valor que ele adquire através de um empréstimo um dia após chegar à cidade.",
      "A Busca por Iarno Albrek: Sildar é um agente da Aliança dos Lordes e veio a Phandalin especificamente para investigar o desaparecimento de seu contato e colega de facção, o mago humano Iarno Albrek.",
      "Resgate de Gundren: Sildar também quer encontrar a mina perdida e ajudar os irmãos Busca-pedra."
    ]
  },
  {
    id: "goblin-estranho",
    name: "Goblin Estranho",
    title: "Goblin",
    image: "Personagens/GoblinEstranho.webp",
    location: "Diversas",
    notes: [
      "Não parece pertencer ao grupo dos goblins Dente Fino.",
      "Parece ser mais inteligente que outros goblins.",
      "Status Atual: Paradeiro incerto."
    ]
  },
  {
    id: "iarno-albrek",
    name: "Iarno Albrek",
    title: "Humano",
    location: "Desaparecido",
    notes: [
      "A Ordem: É um mago e colega de Sildar Invernália, sendo também um membro da ordem conhecida como Aliança dos Lordes."
    ]
  },
  {
    id: "a-aranha",
    name: "A Aranha",
    title: "Desconhecido",
    location: "Desconhecida",
    notes: [
      "Tipo/Identidade: Desconhecido.",
      "Raça: Desconhecida.",
      "Mandante: É a figura misteriosa por trás da emboscada na Trilha Trijavali. Pagou e deu ordens diretas aos goblins Dente Fino para capturarem Gundren e roubarem tudo o que ele carregava."
    ]
  },
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
