let cars = [
    {
        "placa": "FQJ-12525",
        "dataEntrada": "08-31-2021 16h",
        "dataSaida": "08-31-2021 17h",
        "ticketStatus": "Pago"
    },
    {
        "placa": "FQJ-12525",
        "dataEntrada": "08-31-2021 16h",
        "dataSaida": "08-31-2021 17h",
        "ticketStatus": "Pago"
    },
]

let tableResumo = document.getElementById('table-resumo')

cars.forEach(obj => {
    let template = `
        <tr>
            <td>${obj["placa"]}</td>
            <td>${obj["dataEntrada"]}</td>
            <td>${obj["dataSaida"]}</td>
            <td>${obj["ticketStatus"]}</td>
        </tr>
    `
    tableResumo.innerHTML += template
});
