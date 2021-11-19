const url = 'http://localhost:80/api/tickets'

function formatarMinutosEmHoras(minutos){
    return formatNumero(Math.floor(minutos / 60)) + ' horas e ' + formatNumero(minutos % 60) + ' minutos';
}

function formatNumero(num){
    return num.toString().padStart(2, '0');
}

function formatDateStr (strDate) {
    if(!strDate) {
        return ""
    }
    let date = new Date(strDate)
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth()+1).toString().padStart(2, "0")}/${date.getFullYear()} 
            ${date.getHours().toString().padStart(2, "0")}h${date.getMinutes().toString().padStart(2, "0")}`
}

function verificarTicket(){
    let codigoTicket = document.getElementById('ticketNumber')
    fetch(`${url}/pagamento/${codigoTicket.value}`)
        .then(res => {
            if(res.status == 200) {
                return res.json()
            }
            else if(res.status == 400) {
                throw Error('Ticket já pago. Se dirija a caine de saída');
            }
            else if(res.status == 404) {
                throw Error('Ticket não encontrado');
            }
            else {
                throw Error('Erro interno, tente novamente!');
            }
        })
        .then(data => {
            if(data.minutos == 0){
                
            }
            document.getElementById('tempo').innerHTML = `Tempo: ${formatarMinutosEmHoras(data.minutos)}`;
            document.getElementById('mensagem').innerHTML = `Valor a pagar: R$ ${data.valor}`;
        })
        .catch((err) => {
            alert(err);
        })
}

function loadTicketNaoPagos(){
    let tableResumoEl = document.getElementById('tabela-corpo')

    fetch(`${url}?status=0`)
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