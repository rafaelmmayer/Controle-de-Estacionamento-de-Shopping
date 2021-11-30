const url = 'http://localhost:80/api/tickets'

function formatDateStr (strDate) {
    if(!strDate) {
        return ""
    }
    let date = new Date(strDate)
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth()+1).toString().padStart(2, "0")}/${date.getFullYear()} 
            ${date.getHours().toString().padStart(2, "0")}h${date.getMinutes().toString().padStart(2, "0")}`
}

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
            method: 'PUT'
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

function loadTicketNaoPagos(){
    let tableResumoEl = document.getElementById('tabela-corpo')
    tableResumoEl.innerHTML = ''
    document.getElementById('tabela-corpo').innerHTML = ''

    fetch(url)
        .then(res => {
            if(res.status == 200) {
                return res.json()
            }
            else {
                throw Error('Erro interno, recarregue a página!');
            }
        })
        .then(data => {
            data.forEach(obj => {
                let template = `
                    <tr>
                        <td>${obj.PLACA}</td>
                        <td>${obj.CODIGO}</td>
                        <td>${formatDateStr(obj.DATA_ENTRADA)}</td>
                    </tr>
                `
                tableResumoEl.innerHTML += template
            })
        })
        .catch((err) => {
            alert(err);
        })    
}

loadTicketNaoPagos()