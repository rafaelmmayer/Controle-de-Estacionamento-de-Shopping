const express = require('express')
const cors = require('cors')
const app = express()
const dbConfig = require('./dbconfig')
const oracledb = require('oracledb')

app.use(cors())
app.use(express.json())

oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

function connect() {
    return oracledb.getConnection({
        user: dbConfig.dbuser,
        password: dbConfig.dbpassword,
        connectString: dbConfig.connectString
    });
}

function generateCodigo() {
    let chars = "0123456789ABCDEFGHIJLMNOPQRSTUVWXYZ";
    let codigoLength = 10;
    let codigo = "";
    for (let i = 0; i < codigoLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        codigo += chars.substring(randomNumber, randomNumber + 1);
    }
    return codigo
}

function calcularValorAPagar(ticket){
    let dataAtual = new Date()
    let dataEntrada = ticket.DATA_ENTRADA
    let diff = dataAtual.getTime() - dataEntrada.getTime();
    let minutos = Math.round(diff / 60000);

    if(minutos <= 15) {
        let res = {
            minutos: minutos,
            valor: 0
        }
        return res;
    }
    else if(minutos <= 180) {
        let res = {
            minutos: minutos,
            valor: 12
        }
        return res;
    }
    else {
        let minutosAMais = minutos - 180;
        let valorTotal = Math.ceil(minutosAMais / 60) + 12;

        let diffDia = new Date().getDate() - dataEntrada.getDate();
        valorTotal += diffDia * 40;

        let res = {
            minutos: minutos,
            valor: valorTotal.toFixed(2)
        }

        return res;
    }
}

const defaultRoute = '/api/tickets'

app.get(defaultRoute, async (req, res) => {
    let connection
    try {
        let result
        const queryParams = req.query
        connection = await connect()
        
        if (queryParams.status) { // retorna tickets com status que veio da query
            result = await connection.execute(
                'select PLACA, DATA_ENTRADA, VALOR_TOTAL, CODIGO from tickets where STATUS=:status',
                { status: queryParams.status }
            )
        }
        else if (queryParams.finalizados == 1) {
            result = await connection.execute(
                'select PLACA, DATA_ENTRADA, DATA_SAIDA, VALOR_TOTAL, CODIGO from tickets where DATA_SAIDA is not null'
            )
        }
        else if (queryParams.finalizados == 0) {
            result = await connection.execute(
                `select * from tickets
                where DATA_SAIDA is null
                and STATUS=1`
            )
        }
        else { // retornar todos os tickets
            result = await connection.execute('select * from tickets')
        }
        res.json(result.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json('Erro interno')
    } finally {
        connection.close()
    }
})

// retorna ticket a partir de um código
app.get(`${defaultRoute}/:codigo`, async (req, res) => {
    let connection
    try {
        const codigo = req.params.codigo
        connection = await connect()
        let result = await connection.execute(
            'select * from tickets where CODIGO=:codigo and ROWNUM=1',
            { codigo: codigo }
        )
        if (result.rows.length > 0) {
            res.json(result.rows[0])
        }
        else {
            res.status(404).json(codigo)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json('Erro interno')
    } finally {
        connection.close()
    }
})

// Retorna valor a pagar
app.get(`${defaultRoute}/pagamento/:codigo`, async (req, res) => {
    let connection
    try {
        const codigo = req.params.codigo
        connection = await connect()
        let result = await connection.execute(
            'select * from tickets where CODIGO=:codigo and ROWNUM=1',
            { codigo: codigo }
        )
        if (result.rows.length > 0) {
            if(result.rows[0].STATUS){
                res.status(400).json(`Ticket ${codigo} já pago. Se dirija a cabina de saída`);
            }
            else {
                res.json(calcularValorAPagar(result.rows[0]));
            }
        }
        else {
            res.status(404).json(`Ticket ${codigo} não encontrado`);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json('Erro interno');
    } finally {
        connection.close()
    }
})

// Adiciona placa no banco de dados
app.post(defaultRoute, async (req, res) => {
    let connection
    try {
        let ticket = {
            codigo: generateCodigo(),
            dataEntrada: new Date(),
            placa: req.body.placa
        }
        connection = await connect()
        await connection.execute(
            `insert into tickets 
            (CODIGO, STATUS, DATA_ENTRADA, PLACA) values 
            (:codigo, 0, :dataEntrada, :placa)`,
            { codigo: ticket.codigo, dataEntrada: ticket.dataEntrada, placa: ticket.placa }
        )
        res.status(201).json(ticket.codigo)
    } catch (err) {
        console.log(err)
        res.status(500).json('Erro interno')
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
        if (result.rows.length > 0) {
            if(result.rows[0].STATUS == 1){
                res.status(400).json(`Ticket ${body.codigo} ja foi pago. Por favor, vá até a cabine de saída`);
            }
            let id = result.rows[0].ID
            await connection.execute(
                'update tickets set VALOR_TOTAL=:valorTotal, STATUS=1 where ID=:id',
                { valorTotal: body.valorTotal, id: id }
            )
            res.status(200).json(`Ticket ${body.codigo} pago`);
        } else {
            res.status(404).json(`Ticket ${body.codigo} não encontrado`);
        }
    } catch (err) {
        console.log(err)
        res.status(500).json('Erro interno')
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
        if (result.rows.length > 0) {
            let ticket = result.rows[0]
            if (ticket.STATUS == 1) {
                await connection.execute(
                    'update tickets set DATA_SAIDA=:dataSaida where ID=:id',
                    { dataSaida: new Date(), id: ticket.ID }
                )
                res.status(200).json(`Ticket ${codigo} liberado, obrigado e volte sempre!`)
            } else {
                res.status(400).json(`Ticket ${codigo} não pago, por favor retorne ao Caixa de Cobrança!`)
            }
        } else {
            res.status(404).json(`Ticket ${codigo} não encontrado`)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json('Erro interno')
    } finally {
        connection.close()
    }
})

app.listen(80, function () {
    console.log('Server iniciado em http://localhost:80')
})