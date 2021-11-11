let tableResumoEl = document.getElementById('tabela-corpo')

function formatDateStr (strDate) {
    if(!strDate) {
        return ""
    }
    let date = new Date(strDate)
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth()+1).toString().padStart(2, "0")}/${date.getFullYear()} 
            ${date.getHours().toString().padStart(2, "0")}h${date.getMinutes().toString().padStart(2, "0")}`
}

async function fetchTicket() {
    let response = await fetch('http://localhost:80/api/tickets/finalizados');
    let tickets = await response.json();

    tickets.forEach(obj => {
        let template = `
            <tr>
                <td>${obj.PLACA}</td>
                <td>${formatDateStr(obj.DATA_ENTRADA)}</td>
                <td>${formatDateStr(obj.DATA_SAIDA)}</td>
                <td>${obj.CODIGO}</td>
                <td>R$ ${obj.VALOR_TOTAL.toFixed(2)}</td>
            </tr>
        `
        tableResumoEl.innerHTML += template
    })
}

fetchTicket()