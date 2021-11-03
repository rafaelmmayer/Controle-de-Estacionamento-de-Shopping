var teste = [];
function bntvalid() {
    
    var input = document.querySelector("#nome");

    console.log(input);
  
    var iMercoPlaca = input.value;

    var iMercoMoto = input.value;

    if (validaPlacaCarro(iMercoPlaca)){
        window.location.href = "./ticket-Entrada.html"
    } else {
        if (validaPlacaMoto(iMercoMoto)){
        window.location.href = "./ticket-Entrada.html"
        } else {
            console.log(alert('Número digitado não condiz com placa merco sul'));
        };
    };
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
    alert("Catraca liberada! Pode prosseguir!")
}