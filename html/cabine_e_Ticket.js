
function bntvalid(placa) {
    
    var input = document.querySelector("#nome");

    var mercoPlaca = input.value;

    var mercoMoto = input.value;

    var placa = "ABC1234"
    
    var resp = "Placa inválida";

    const mercoPlaca = /^[a-zA-Z]{3}[0-9]{1}[a-zA-Z]{1}[0-9]{2}$/;

    const mercoMoto = /^[a-zA-Z]{3}[0-9]{2}[a-zA-Z]{1}[0-9]{1}$/;

    if(mercoPlaca.test(placa)){

    resp = "Placa válida - carro ";

    }

    if(mercoMoto.test(placa)){

    resp = "Placa válida - moto";

    }
}

console.log("teste");
console.log(validarPlaca("ABC1234"));
console.log(validarPlaca("ABC12356"));