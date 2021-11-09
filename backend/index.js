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

// Retorna todos os ticket
app.get(defaultRoute, async (req, res) => {
    let connection
    try{
        let sql = 'select * from ticket'
        let result
        const queryParams = req.query
        connection = await connect()
        if(queryParams.status){
            result = await connection.execute(`${sql} where STATUS=:status`, queryParams)
        }
        else if(queryParams.finalizados) {
            result = await connection.execute(`${sql} where DATA_SAIDA is not null`)
        }
        else{
            result = await connection.execute(sql)
        }
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
        const result = await connection.execute(
            `insert into tickets 
            (CODIGO, STATUS, DATA_ENTRADA, PLACA) values 
            (:CODIGO, :STATUS, :DATA_ENTRADA, :PLACA)`,
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

app.listen(80, function () {
    console.log('Server iniciado em http://localhost:80')
})