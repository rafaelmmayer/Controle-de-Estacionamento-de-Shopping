const url = 'http://localhost:80/api/tickets'

function formatDateStr (strDate) {
    if(!strDate) {
        return ""
    }
    let date = new Date(strDate)
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth()+1).toString().padStart(2, "0")}/${date.getFullYear()} 
            ${date.getHours().toString().padStart(2, "0")}h${date.getMinutes().toString().padStart(2, "0")}`
}

function bntvalid() {
    
    var input = document.querySelector("#nome");

    var iMercoPlaca = input.value;

    var iMercoMoto = input.value;

    if (validaPlacaCarro(iMercoPlaca)){
        salvaPlaca(iMercoPlaca);
        //window.location.href = "./ticket-Entrada.html"
    } else {
        if (validaPlacaMoto(iMercoMoto)){
            salvaPlaca(iMercoMoto);
        //window.location.href = "./ticket-Entrada.html"
        } else {
            alert('Número digitado não condiz com placa merco sul');
        };
    };
}

function salvaPlaca(placa) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            placa: placa
        })
    })
    .then(res => {
        if(res.status == 201) {
            return res.json()
        }        
        else {
            throw Error('Erro interno, tente novamente!');
        }
    })
    .then(data => {
        document.querySelector(".span-ticket").innerHTML = data;
        document.querySelector(".span-data").innerHTML = formatDateStr(new Date());
    })
    .catch((err) => {
        alert(err);
    });
}

function validaPlacaCarro(placaCarro){
    var placaValid = false;
    const mercoPlaca = /^[a-zA-Z]{3}[0-9]{1}[a-zA-Z]{1}[0-9]{2}$/;

    if(mercoPlaca.test(placaCarro)){

        placaValid = true;

    }

        return placaValid;
}

function validaPlacaMoto(placaMoto){
    var placaVald = false;

    const mercoMoto = /^[a-zA-Z]{3}[0-9]{2}[a-zA-Z]{1}[0-9]{1}$/;

    if(mercoMoto.test(placaMoto)){

        placaVald = true;

    }

    return placaVald;
}

function bntmsg (){
    alert("Cancela liberada! Pode prosseguir!")
}