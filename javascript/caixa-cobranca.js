let qtdPagos = 0
let qtdNaoPagos = 0

let cars = [
    {
        "ticket": "0522ASD4174",
        "ticketStatus": "Pago",
        "valorPago": 10.29
    },
    {
        "ticket": "D45AS5D485A",
        "ticketStatus": "Pago",
        "valorPago": 10.29
    },
    {
        "ticket": "FEW154FDS65",
        "ticketStatus": "Não pago",
        "valorPago": 0
    },
    {
        "ticket": "489EWDF456E",
        "ticketStatus": "Não pago",
        "valorPago": 0
    },
    {
        "ticket": "EFW5164DSFC",
        "ticketStatus": "Pago",
        "valorPago": 28.45
    },
    {
        "ticket": "WEF4F4E54E8",
        "ticketStatus": "Não pago",
        "valorPago": 0
    },
    {
        "ticket": "G5491REERG4",
        "ticketStatus": "Não pago",
        "valorPago": 0
    },
    {
        "ticket": "CDVS456DS65",
        "ticketStatus": "Pago",
        "valorPago": 28.45
    }
]

let tableResumoEl = document.getElementById('tabela-corpo')
let qtdPagosEl = document.getElementById('qtdPagos')
let qtdNaoPagosEl = document.getElementById('qtdNaoPagos')
let qtdTotalEl = document.getElementById('qtdTotal')

cars.forEach(obj => {
    let template = `
        <tr>
            <td>${obj["ticket"]}</td>
            <td>${obj["ticketStatus"]}</td>
            <td>R$ ${obj["valorPago"].toFixed(2)}</td>
        </tr>
    `
    tableResumoEl.innerHTML += template
    lucroTotal += obj["valorPago"]

    if(obj["ticketStatus"] === "Pago"){
        qtdPagos += 1
    }
})

qtdPagosEl.innerHTML = qtdPagos + " carros"
qtdNaoPagosEl.innerHTML = cars.length - qtdPagos + " carros"
qtdTotalEl.innerHTML = cars.length + " carros"