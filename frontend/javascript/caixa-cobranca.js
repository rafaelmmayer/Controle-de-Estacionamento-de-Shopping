const url = 'http://localhost:80/api/tickets';
let valorTicket = 0;

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
    let codigoTicket = document.getElementById('codigoTicket')
    document.getElementById('mensagem-verificacao-tempo').innerHTML = ''
    document.getElementById('mensagem-verificacao-valor').innerHTML = ''
    fetch(`${url}/pagamento/${codigoTicket.value}`) // http://localhost:80/api/tickets/pagamento/SIN4QZNSOB
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
            if(data.valor == 0){
                document.getElementById('mensagem-verificacao-tempo').innerHTML = `Ticket ainda dentro dos 15 minutos.`;
            }
            else {
                document.getElementById('mensagem-verificacao-tempo').innerHTML = `Tempo: ${formatarMinutosEmHoras(data.minutos)}`;
                valorTicket = data.valor;
                document.getElementById('mensagem-verificacao-valor').innerHTML = `Valor a pagar: R$ ${data.valor}`;
            }
        })
        .catch((err) => {
            alert(err);
        })
}

function efetivarPagamento(){
    let codigoTicket = document.getElementById('codigoTicket')
    fetch(`${url}/pagamento`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            codigo: codigoTicket.value,
            valorTotal: valorTicket
        })
    })
    .then(res => {
        if(res.status == 200) {
            return res.json()
        }
        else if(res.status == 400) {
            throw Error(`Ticket ja foi pago. Por favor, vá até a Cabine de Saída`);
        }
        else if(res.status == 404) {
            throw Error('Ticket não encontrado');
        }
        else {
            throw Error('Erro interno, tente novamente!');
        }
    })
    .then(data => {
        alert(data)
        codigoTicket.value = ''
        loadTicketNaoPagos()
    })
    .catch((err) => {
        alert(err);
    });
}

function loadTicketNaoPagos(){
    let tableResumoEl = document.getElementById('tabela-corpo')
    tableResumoEl.innerHTML = ''
    document.getElementById('mensagem-verificacao-tempo').innerHTML = ''
    document.getElementById('mensagem-verificacao-valor').innerHTML = ''

    fetch(`${url}?status=0`) // http://localhost:80/api/tickets?status=0
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