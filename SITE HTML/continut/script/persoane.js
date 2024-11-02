function loadXMLDoc(filename) {
            if (window.XMLHttpRequest) {
                xhttp = new XMLHttpRequest();
            } else { // Pentru IE 5/6
                xhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhttp.open("GET", filename, false);
            xhttp.send();
            return xhttp.responseXML;
        }

        // Parsarea XML-ului
        const xmlDoc = loadXMLDoc("resurse/persoane.xml");

        // Funcție pentru afișarea informațiilor în tabel
        function afiseazaPersoane() {
            const tableBody = document.getElementById('persoaneBody');
            const persoane = xmlDoc.getElementsByTagName('persoana');

            for (let i = 0; i < persoane.length; i++) {
                const nume = persoane[i].getElementsByTagName('nume')[0].textContent;
                const prenume = persoane[i].getElementsByTagName('prenume')[0].textContent;
                const varsta = persoane[i].getElementsByTagName('varsta')[0].textContent;
                const adresa = `${persoane[i].getElementsByTagName('strada')[0].textContent}, ${persoane[i].getElementsByTagName('numar')[0].textContent}, ${persoane[i].getElementsByTagName('localitate')[0].textContent}`;
                const studii = `${persoane[i].getElementsByTagName('liceu')[0].textContent}, ${persoane[i].getElementsByTagName('facultate')[0].textContent}`;
                const limbi = [];
                const limbiNode = persoane[i].getElementsByTagName('limbi')[0].children;
                for (let j = 0; j < limbiNode.length; j++) {
                    const limba = limbiNode[j].tagName + ": " + limbiNode[j].textContent;
                    limbi.push(limba);
                }

                const newRow = tableBody.insertRow();
                newRow.innerHTML = `<td>${nume}</td>
                                    <td>${prenume}</td>
                                    <td>${varsta}</td>
                                    <td>${adresa}</td>
                                    <td>${studii}</td>
                                    <td>${limbi.join(", ")}</td>`;
            }
        }

        function verificaUtilizator() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const utilizatori = JSON.parse(xhr.responseText);
                        const gasit = utilizatori.some(function(utilizator) {
                            return utilizator.utilizator === username && utilizator.parola === password;
                        });
                        if (gasit) {
                            document.getElementById('rezultat').textContent = 'Utilizator și parolă corecte.';
                        } else {
                            document.getElementById('rezultat').textContent = 'Utilizator sau parolă incorecte.';
                        }
                    } else {
                        document.getElementById('rezultat').textContent = 'Eroare la încărcarea datelor.';
                    }
                }
            };
            xhr.open('GET', 'resurse/utilizatori.json', true);
            xhr.send();
        }