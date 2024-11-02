class Produs {
    constructor(id, nume, cant) {
        this.id = id;
        this.nume = nume;
        this.cantitate = cant;
    }
}

function addProdus() {
    var nume = document.getElementById("nume").value;
    var cantitate = document.getElementById("cantitate").value;

    afiseazaProduse();

    if (nume === "" || cantitate === "") {
        alert("Vă rugăm să completați toate câmpurile.");
        return;
    }
    
    var produsNou = new Produs(generateId(), nume, cantitate);
    var produseLocalStorage = JSON.parse(localStorage.getItem("produse")) || [];
    
    produseLocalStorage.push(produsNou);
    localStorage.setItem("produse", JSON.stringify(produseLocalStorage));
    
    afiseazaProduse();
}

function generateId() {
    var id = JSON.parse(localStorage.getItem("lastId")) || 0;
    id++;
    localStorage.setItem("lastId", JSON.stringify(id));
    return id;
}

function afiseazaProduse() {
    var produseLocalStorage = JSON.parse(localStorage.getItem("produse")) || [];
    var tableBody = document.getElementById("tableProd").getElementsByTagName("tbody")[0];
    
    tableBody.innerHTML = ""; // Curăță conținutul tabelului
    
    produseLocalStorage.forEach(function(produs) {
        var row = tableBody.insertRow();
        row.insertCell(0).innerHTML = produs.id;
        row.insertCell(1).innerHTML = produs.nume;
        row.insertCell(2).innerHTML = produs.cantitate;
    });
}