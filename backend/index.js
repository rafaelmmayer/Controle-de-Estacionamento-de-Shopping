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

app.get(defaultRoute, async (req, res) => {
    let connection
    try{
        let result
        const queryParams = req.query
        connection = await connect()
        if(queryParams.status){
            result = await connection.execute(
                'select PLACA, DATA_ENTRADA, VALOR_TOTAL from tickets where STATUS=:status',
                { status: queryParams.status }
            )
        }
        else if(queryParams.codigo){
            result = await connection.execute(
                'select * from tickets where CODIGO=:codigo and ROWNUM=1',
                { codigo: queryParams.codigo }
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

// Retorna todos os ticket finalizados
app.get(`${defaultRoute}/finalizados`, async (req, res) => {
    let connection
    try{
        connection = await connect()
        let result = await connection.execute(
            'select PLACA, DATA_ENTRADA, DATA_SAIDA, VALOR_TOTAL from tickets where DATA_SAIDA is not null'
        )
        res.send(result.rows)
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
        const ticket = req.body
        ticket.DATA_ENTRADA = new Date()
        connection = await connect()
        await connection.execute(
            `insert into tickets 
            (CODIGO, STATUS, DATA_ENTRADA, PLACA) values 
            (:CODIGO, 0, :DATA_ENTRADA, :PLACA)`,
            ticket
        )
        res.status(201).send("Ticket criado")
    } catch (err) {
        console.log(err)
        res.status(500).send('Erro interno')
    } finally {
        connection.close()
    }
})

// Atualiza ticket depois do pagamento
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
                'update tickets set VALOR_TOTAL=:valorTotal where ID=:id',
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
            'select ID from tickets where CODIGO=:codigo and ROWNUM=1',
            { codigo: codigo }
        )

        if(result.rows.length > 0) {
            await connection.execute(
                'update tickets set DATA_SAIDA=:dataSaida where ID=:id',
                { dataSaida: new Date(), id: result.rows[0].ID }
            )
            res.status(200).send(`Ticket ${codigo} liberado`)
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