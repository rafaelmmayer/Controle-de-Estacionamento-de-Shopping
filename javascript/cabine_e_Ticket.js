function cadastrar () {
    var placaCarro = Placa.cadastro.value;

    if (placaCarro != NaN || cadastro.lenght != 7) {
            alert("Quantidade de caracteres invalida");
            placa.cadastro.focus();
            return false;
    }
}   