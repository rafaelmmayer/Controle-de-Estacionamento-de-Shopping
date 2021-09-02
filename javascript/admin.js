let cars = [
    {
        "placa": "FQJ-12525",
        "dataEntrada": "08-31-2021 16h",
        "dataSaida": "08-31-2021 17h",
        "ticket": "0522ASD4174",
        "ticketStatus": "Pago",
        "valorPago": 10.29,
    },
    {
        "placa": "FQJ-12525",
        "dataEntrada": "08-31-2021 16h",
        "dataSaida": "08-31-2021 17h",
        "ticket": "0522ASD4174",
        "ticketStatus": "Pago",
        "valorPago": 10.29,
    },
    {
        "placa": "FQJ-12525",
        "dataEntrada": "08-31-2021 16h",
        "dataSaida": "08-31-2021 17h",
        "ticket": "0522ASD4174",
        "ticketStatus": "Não pago",
        "valorPago": 10.29,
    },
    {
        "placa": "FQJ-12525",
        "dataEntrada": "08-31-2021 16h",
        "dataSaida": "08-31-2021 17h",
        "ticket": "0522ASD4174",
        "ticketStatus": "Não pago",
        "valorPago": 10.29,
    },
    {
        "placa": "FQJ-12525",
        "dataEntrada": "08-31-2021 16h",
        "dataSaida": "08-31-2021 17h",
        "ticket": "0522ASD4174",
        "ticketStatus": "Pago",
        "valorPago": 28.45,
    },
]

let tableResumoEl = document.getElementById('tabela-corpo')
let lucroEl = document.getElementById('lucroTotal')
let qtdPagosEl = document.getElementById('qtdPagos')
let qtdNaoPagosEl = document.getElementById('qtdNaoPagos')
let qtdTotalEl = document.getElementById('qtdTotal')

let lucroTotal = 0
let qtdPagos = 0
let qtdNaoPagos = 0

cars.forEach(obj => {
    let template = `
        <tr>
            <td>${obj["placa"]}</td>
            <td>${obj["dataEntrada"]}</td>
            <td>${obj["dataSaida"]}</td>
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

lucroEl.innerHTML = "R$ " + lucroTotal.toFixed(2)
qtdPagosEl.innerHTML = qtdPagos
qtdNaoPagosEl.innerHTML = cars.length - qtdPagos
qtdTotalEl.innerHTML = cars.length