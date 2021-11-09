let lucroTotal = 0
let qtdPagos = 0
let qtdNaoPagos = 0

let cars = [
    {
        "placa": "FQJ-1225",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "Thu Sep 02 2021 09:25:48 GMT-0300",
        "ticket": "0522ASD4174",
        "ticketStatus": "Pago",
        "valorPago": 10.29
    }, 
    {
        "placa": "DFR-6575",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "Thu Sep 02 2021 10:59:48 GMT-0300",
        "ticket": "D45AS5D485A",
        "ticketStatus": "Pago",
        "valorPago": 10.29
    },
    {
        "placa": "NBY-1859",
        "dataEntrada": "Thu Sep 02 2021 07:00:48 GMT-0300",
        "dataSaida": "",
        "ticket": "FEW154FDS65",
        "ticketStatus": "Não pago",
        "valorPago": 0
    },
    {
        "placa": "NAA-0201",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "",
        "ticket": "489EWDF456E",
        "ticketStatus": "Não pago",
        "valorPago": 0
    },
    {
        "placa": "HRE-3091",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "Thu Sep 02 2021 16:32:48 GMT-0300",
        "ticket": "EFW5164DSFC",
        "ticketStatus": "Pago",
        "valorPago": 28.45
    },
    {
        "placa": "JRG-0851",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "",
        "ticket": "WEF4F4E54E8",
        "ticketStatus": "Não pago",
        "valorPago": 0
    },
    {
        "placa": "MXV-8546",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "",
        "ticket": "G5491REERG4",
        "ticketStatus": "Não pago",
        "valorPago": 0
    },
    {
        "placa": "MOA-5796",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "Thu Sep 02 2021 19:36:48 GMT-0300",
        "ticket": "CDVS456DS65",
        "ticketStatus": "Pago",
        "valorPago": 28.45
    },
    {
        "placa": "JRG-0851",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "",
        "ticket": "WEF4F4E54E8",
        "ticketStatus": "Não pago",
        "valorPago": 0
    },
    {
        "placa": "MXV-8546",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "",
        "ticket": "G5491REERG4",
        "ticketStatus": "Não pago",
        "valorPago": 0
    },
    {
        "placa": "MOA-5796",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "Thu Sep 02 2021 19:36:48 GMT-0300",
        "ticket": "CDVS456DS65",
        "ticketStatus": "Pago",
        "valorPago": 28.45
    },
    {
        "placa": "JRG-0851",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "",
        "ticket": "WEF4F4E54E8",
        "ticketStatus": "Não pago",
        "valorPago": 0
    },
    {
        "placa": "MXV-8546",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "",
        "ticket": "G5491REERG4",
        "ticketStatus": "Não pago",
        "valorPago": 0
    },
    {
        "placa": "MOA-5796",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "Thu Sep 02 2021 19:36:48 GMT-0300",
        "ticket": "CDVS456DS65",
        "ticketStatus": "Pago",
        "valorPago": 28.45
    },
    {
        "placa": "JRG-0851",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "",
        "ticket": "WEF4F4E54E8",
        "ticketStatus": "Não pago",
        "valorPago": 0
    },
    {
        "placa": "MXV-8546",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "",
        "ticket": "G5491REERG4",
        "ticketStatus": "Não pago",
        "valorPago": 0
    },
    {
        "placa": "MOA-5796",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "Thu Sep 02 2021 19:36:48 GMT-0300",
        "ticket": "CDVS456DS65",
        "ticketStatus": "Pago",
        "valorPago": 28.45
    },
    {
        "placa": "JRG-0851",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "",
        "ticket": "WEF4F4E54E8",
        "ticketStatus": "Não pago",
        "valorPago": 0
    },
    {
        "placa": "MXV-8546",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "",
        "ticket": "G5491REERG4",
        "ticketStatus": "Não pago",
        "valorPago": 0
    },
    {
        "placa": "MOA-5796",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "Thu Sep 02 2021 19:36:48 GMT-0300",
        "ticket": "CDVS456DS65",
        "ticketStatus": "Pago",
        "valorPago": 28.45
    },
    {
        "placa": "JRG-0851",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "",
        "ticket": "WEF4F4E54E8",
        "ticketStatus": "Não pago",
        "valorPago": 0
    },
    {
        "placa": "MXV-8546",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "",
        "ticket": "G5491REERG4",
        "ticketStatus": "Não pago",
        "valorPago": 0
    },
    {
        "placa": "MOA-5796",
        "dataEntrada": "Thu Sep 02 2021 08:12:48 GMT-0300",
        "dataSaida": "Thu Sep 02 2021 19:36:48 GMT-0300",
        "ticket": "CDVS456DS65",
        "ticketStatus": "Pago",
        "valorPago": 28.45
    }
]

let tableResumoEl = document.getElementById('tabela-corpo')
let lucroEl = document.getElementById('lucroTotal')
let qtdPagosEl = document.getElementById('qtdPagos')
let qtdNaoPagosEl = document.getElementById('qtdNaoPagos')
let qtdTotalEl = document.getElementById('qtdTotal')

function formatDateStr (strDate) {
    if(!strDate) {
        return ""
    }
    let date = new Date(strDate)
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth()+1).toString().padStart(2, "0")}/${date.getFullYear()} 
            ${date.getHours().toString().padStart(2, "0")}h${date.getMinutes().toString().padStart(2, "0")}`
}

function valorTotal (strDtSaida, strDtEntrada) {
    if(!strDtSaida || !strDtEntrada){
        return ""
    }
    let dtSaida = new Date(strDtSaida)
    let dtEntrada = new Date(strDtEntrada)
    let diff =(dtSaida.getTime() - dtEntrada.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff)) * 15;
}

cars.forEach(obj => {
    let template = `
        <tr>
            <td>${obj["placa"]}</td>
            <td>${formatDateStr(obj["dataEntrada"])}</td>
            <td>${formatDateStr(obj["dataSaida"])}</td>
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
qtdPagosEl.innerHTML = qtdPagos + " carros"
qtdNaoPagosEl.innerHTML = cars.length - qtdPagos + " carros"
qtdTotalEl.innerHTML = cars.length + " carros"