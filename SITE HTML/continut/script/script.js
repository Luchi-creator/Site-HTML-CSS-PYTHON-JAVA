function f()
{
    let e = document.getElementById("myURL");
    e.innerHTML = location.href;

    setInterval(g,1000);

    let startX, startY;
    
        function deseneazaDreptunghi(event) {
            const canvas = document.getElementById('Canvas');
            const context = canvas.getContext('2d');
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            const prColor = document.getElementById('prColor').value;
            const secColor = document.getElementById('secColor').value;

            if (!startX || !startY) {
                startX = mouseX;
                startY = mouseY;
            } else {
                const width = mouseX - startX;
                const height = mouseY - startY;

                context.clearRect(0, 0, canvas.width, canvas.height); 
                context.fillStyle = prColor;
                context.fillRect(startX, startY, width, height);
                context.strokeStyle = secColor;
                context.strokeRect(startX, startY, width, height);

                startX = null;
                startY = null;
            }
        }

        const canvas = document.getElementById('Canvas');
        canvas.addEventListener('click', deseneazaDreptunghi);
}

function g()
{
    document.getElementById("myDateTime").innerHTML = new Date();
    document.getElementById("myLocation").innerHTML = location.origin;
    document.getElementById("myBrowser").innerHTML = navigator.appName + navigator.appVersion;
}


function addColumn() {
    
    const table = document.getElementById('myTable');
    const pozitieInput = document.getElementById('pozitie');
    const culoareTare = document.getElementById('culoareTare').value;

    const pozitie = parseInt(pozitieInput.value);
    if (isNaN(pozitie) || pozitie < 1 || pozitie > table.rows[0].cells.length + 1) {
        alert('Introduceți o poziție validă!');
        return;
    }

    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        const cell = row.insertCell(pozitie - 1);

        cell.style.backgroundColor = culoareTare;
        cell.style.width = '50px'; 
    }

}

function addRow() {
    const table = document.getElementById('myTable');
    const pozitieInput = document.getElementById('pozitie');
    const culoareTare = document.getElementById('culoareTare').value;

    const pozitie = parseInt(pozitieInput.value);
    if (isNaN(pozitie) || pozitie < 1 || pozitie > table.rows.length + 1) {
        alert('Introduceți o poziție validă!');
        return;
    }

    const newRow = table.insertRow(pozitie - 1); 

    for (let i = 0; i < table.rows[0].cells.length; i++) {
        const cell = newRow.insertCell(i);

        cell.style.backgroundColor = culoareTare;
        cell.style.width = '50px';
    }
}


function deleteColumn() {
    var table = document.getElementById("myTable");
    var rowCount = table.rows.length;

    for (var i = 0; i < rowCount; i++) {
        table.rows[i].deleteCell(-1);
    }
}

function deleteRow() {
    var table = document.getElementById("myTable");
    var rowCount = table.rows.length;
    if (rowCount > 1) {
        table.deleteRow(-1);
    }
}


function schimbaContinut(resursa,jsFisier,jsFunctie)
{
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      document.getElementById("continut").innerHTML = this.responseText;
    }
    xhttp.open("GET", resursa + ".html");
    xhttp.send();

    document.getElementById("continut").innerHTML = this.responseText;

    if (jsFisier) {
        var elementScript = document.createElement('script');
        elementScript.onload = function () {
        console.log("hello");
        if (jsFunctie) {
        window[jsFunctie]();
        }
        };
        elementScript.src = jsFisier;
        document.head.appendChild(elementScript);
        } else {
        if (jsFunctie) {
        window[jsFunctie]();
        }
    }
}