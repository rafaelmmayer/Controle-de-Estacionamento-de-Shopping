const url = 'http://localhost:80/api/tickets'

function efetuarSaida(){

    document.getElementById('mensagem-saida').innerHTML = ''

    let codigoTicket = document.getElementById('ticket')
    let mensagemSaidaSpan = document.getElementById('mensagem-saida')

    if(!codigoTicket.value) {
        mensagemSaidaSpan.innerHTML = 'Digite o ticket novamente';
        codigoTicket.value = ''
        return;
    }

    fetch(`${url}/saida/${codigoTicket.value}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => {
            if(res.status == 200) {
                return res.json()
            }
            else if(res.status == 400) {
                throw Error(`Ticket não pago, por favor retorne ao Caixa de Cobrança!`);
            }
            else if(res.status == 404) {
                throw Error('Ticket não encontrado');
            }
            else {
                throw Error('Erro interno, tente novamente!');
            }
        })
        .then(data => {
            document.getElementById('mensagem-saida').innerHTML = data
            codigoTicket.value = ''
        })
        .catch((err) => {
            alert(err);
        });
}