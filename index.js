var selectedRow = null;
const baseURL = "http://api.jolpi.ca/ergast/f1/"

//show user alertrs
function showAlert(message, className){
    const dive = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
}

async function fetchSeasonData() {
    const Season = document.getElementById("Season").value;
    const Team = document.getElementById("Team").value;
    const Driver = document.getElementById("Driver").value;
    const responseSeason = await fetch(`http://api.jolpi.ca/ergast/f1/${Season}`)

    if(!responseSeason.ok){
        throw new Error("Could not fetch resource");
    }

    const data = await responseSeason.json();
}