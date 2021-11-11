const express = require('express')
const cors = require('cors')
const app = express()
const dbConfig = require('./dbconfig')
const oracledb = require('oracledb')

app.use(cors())
app.use(express.json())

oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const defaultRoute = '/api/tickets'

async function connect() {    
    return await oracledb.getConnection({
        user: dbConfig.dbuser,
        password: dbConfig.dbpassword,
        connectString: dbConfig.connectString
    });
}

function generateTicket() {
    return 
}

app.get(defaultRoute, async (req, res) => {
    let connection
    try{
        let result
        const queryParams = req.query
        connection = await connect()
        if(queryParams.status){ // retorna tickets com status que veio da query
            result = await connection.execute(
                'select PLACA, DATA_ENTRADA, VALOR_TOTAL, CODIGO from tickets where STATUS=:status',
                { status: queryParams.status }
            )
        }
        else if (queryParams.finalizados){
            result = await connection.execute(
                'select PLACA, DATA_ENTRADA, DATA_SAIDA, VALOR_TOTAL, CODIGO from tickets where DATA_SAIDA is not null'
            )
        }
        else{ // retornar todos os tickets
            result = await connection.execute('select * from tickets')
        }
        res.send(result.rows)
    } catch (err){
        console.log(err)
        res.status(500).send('Erro interno')
    } finally {
        connection.close()        
    }
})

// retorna ticket a partir de um código
app.get(`${defaultRoute}/:codigo`, async (req, res) => {
    let connection
    try{
        const codigo = req.params.codigo
        connection = await connect()
        let result = await connection.execute(
            'select * from tickets where CODIGO=:codigo and ROWNUM=1',
            { codigo: codigo }
        )
        if(result.rows.length > 0){
            res.send(result.rows[0])
        }
        else{
            res.status(404).send(`Ticket ${codigo} não encontrado`)
        }
    } catch (err){
        console.log(err)
        res.status(500).send('Erro interno')
    } finally {
        connection.close()        
    }
})

// Adiciona ticket no banco de dados
app.post(defaultRoute, async (req, res) => {
    let connection
    try {
        let ticket = {
            codigo: generateTicket(),
            dataEntrada: new Date(),
            placa: req.body.placa
        }
        connection = await connect()
        await connection.execute(
            `insert into tickets 
            (CODIGO, STATUS, DATA_ENTRADA, PLACA) values 
            (:codigo, 0, :dataEntrada, :placa)`,
            ticket
        )
        res.status(201).send(`Ticket ${ticket.codigo} criado`)
    } catch (err) {
        console.log(err)
        res.status(500).send('Erro interno')
    } finally {
        connection.close()
    }
})

// realiza pagamento de um ticket
app.put(`${defaultRoute}/pagamento/`, async (req, res) => {
    let connection
    try {
        const body = req.body
        connection = await connect()
        let result = await connection.execute(
            'select ID from tickets where CODIGO=:codigo and ROWNUM=1',
            { codigo: body.codigo }
        )
        if(result.rows.length > 0) {
            let id = result.rows[0].ID
            await connection.execute(
                'update tickets set VALOR_TOTAL=:valorTotal, STATUS=1 where ID=:id',
                { valorTotal: body.valorTotal, id: id }
            )
            res.status(200).send(`Ticket ${body.codigo} pago`)
        }else {
            res.status(404).send(`Ticket ${body.codigo} não encontrado`)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Erro interno')
    } finally {
        connection.close()
    }
})

// Atualiza ticket depois da saída
app.put(`${defaultRoute}/saida/:codigo`, async (req, res) => {
    let connection
    try {
        const codigo = req.params.codigo
        connection = await connect()
        let result = await connection.execute(
            'select ID, STATUS from tickets where CODIGO=:codigo and ROWNUM=1',
            { codigo: codigo }
        )
        if(result.rows.length > 0) {
            let ticket = result.rows[0]
            if(ticket.STATUS == 1){
                await connection.execute(
                    'update tickets set DATA_SAIDA=:dataSaida where ID=:id',
                    { dataSaida: new Date(), id: ticket.ID }
                )
                res.status(200).send(`Ticket ${codigo} liberado`)
            } else {
                res.status(400).send(`Ticket ${codigo} não pago`)
            }            
        }else {
            res.status(404).send(`Ticket ${codigo} não encontrado`)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Erro interno')
    } finally {
        connection.close()
    }
})

app.listen(80, function () {
    console.log('Server iniciado em http://localhost:80')
})