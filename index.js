const express = require('express');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');
const { MongoClient } = require("mongodb");
const { default: helmet } = require('helmet');

const test = require('./test');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true
    }));
app.use(express.json());

io.on('connection', socket => {
    console.log('Connecting...')

    socket.emit('message', 'Well done!');
});

io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });


const uri = "mongodb://localhost:27017/";

app.get('/family/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const client = new MongoClient(uri);
    await client.connect();
    const family = await client.db('fridchen').collection('family').findOne({"id": id});
    await client.close();
    res.status(200).send({
        "status": "ok",
        "family": family
    });
})

app.post('/family')

app.get('/menu/:family_id')

app.post('/menu/:family_id')

app.get('/fridge_item/:family_id')

app.post('/fridge_item/:family_id')

app.delete('/fridge_item/:family_id')

app.get('/shopping_list/:family_id')

app.post('/shopping_list/:family_id')

app.delete('/shopping_list/:family_id')

app.get('/tags')

app.get('/units')

app.post('/ingredients')

app.post('/family_ingredient')

app.get('/all_data')

server.listen(port, () => {
    console.log(`Fridchen api listening at http://localhost:${port}`)
  });