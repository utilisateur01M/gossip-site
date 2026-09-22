/* =========================
   INTRO
========================= */

const intro = document.getElementById("intro");

setTimeout(() => {
    intro.classList.add("hide");
}, 2500);

setTimeout(() => {
    intro.style.display = "none";
}, 3400);


/* =========================
   GOSSIP SYSTEM
========================= */

const titleInput = document.getElementById("gossipTitle");
const categoryInput = document.getElementById("gossipCategory");
const textInput = document.getElementById("gossipText");
const publishBtn = document.getElementById("publishBtn");
const feed = document.getElementById("gossipFeed");


let gossips = JSON.parse(localStorage.getItem("gossips")) || [];


/* AFFICHER LES GOSSIPS */

function displayGossips() {

    feed.innerHTML = "";

    gossips.forEach((gossip) => {

        const article = document.createElement("article");

        article.className = "gossip";

        article.innerHTML = `
            <span class="category">${gossip.category}</span>

            <h3>${gossip.title}</h3>

            <p>${gossip.text}</p>

            <small>${gossip.date}</small>
        `;

        feed.appendChild(article);

    });

}


/* PUBLIER */

publishBtn.addEventListener("click", () => {

    const title = titleInput.value.trim();
    const text = textInput.value.trim();
    const category = categoryInput.value;

    if (title === "" || text === "") {
        alert("Write something first.");
        return;
    }

    const newGossip = {
        title: title,
        text: text,
        category: category,
        date: new Date().toLocaleString()
    };


    /* nouveau gossip en premier */

    gossips.unshift(newGossip);


    /* sauvegarder */

    localStorage.setItem(
        "gossips",
        JSON.stringify(gossips)
    );


    /* vider formulaire */

    titleInput.value = "";
    textInput.value = "";


    /* actualiser feed */

    displayGossips();

});


/* PREMIER CHARGEMENT */

displayGossips();