const express = require('express')
const cors = require('cors')
const app = express()
const dbConfig = require('./dbconfig')
const oracledb = require('oracledb')

app.use(cors())
app.use(express.json())

oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function connect() {    
    return await oracledb.getConnection({
        user: dbConfig.dbuser,
        password: dbConfig.dbpassword,
        connectString: dbConfig.connectString
    });
}

app.get('/', async (req, res) => {
    try{
        let connection = await connect()
        const result = await connection.execute('select * from ticket where id=1')
        res.send(result.rows)
    } catch (err){
        console.log(err)
        res.status(500).send('Internal Error')
    }

})

app.listen(80, function () {
    console.log('Server iniciado em http://localhost:80')
})