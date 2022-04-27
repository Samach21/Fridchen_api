const express = require('express');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');
const { default: helmet } = require('helmet');
const routes = require('./routes');

const {userJoin, userLeave, getCurrentUser, getRoomUsers} = require('./utils/users');

function createServer() {
    const app = express();
    const server = http.createServer(app);
    const io = socketio(server);

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
        
        socket.emit('message', 'Hello!')

        socket.on('joinRoom', data => {
            data = JSON.parse(data)
            const user_id = data.user_id;
            const room = data.family_id;
            const user = userJoin(socket.id, user_id, room);
        
            socket.join(user.room);
            
        
            // Welcome current user
            socket.emit('message', `Welcome to family_id: ${room}`);
        
            // Broadcast when a user connects
            socket.broadcast
              .to(user.room)
              .emit(
                'message',
                `${user.user_id} has joined the room`
              );
        
            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        });

        socket.on('message', mes => {console.log(mes)});

        socket.on('disconnect', () => {
            const user = userLeave(socket.id);
        
            if (user) {
                io.to(user.room).emit(
                    'message',
                    `${user.user_id} has left the room`
                );
            
                // Send users and room info
                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: getRoomUsers(user.room)
                });
            }
        });
    });

    io.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });

    app.use((req, res, next) => {
        req.io = io;
        return next();
    });

    routes(app);

    

    return server
}

module.exports = createServer;


// app.get('/', (req, res) => {
//   res.send('Hello')
// });

// io.on('connection', socket => {
//     console.log('Connecting...')

//     socket.on('joinRoom', ({ username, room }) => {
//         const user = userJoin(socket.id, username, room);
    
//         socket.join(user.room);
    
//         // Welcome current user
//         socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));
    
//         // Broadcast when a user connects
//         socket.broadcast
//           .to(user.room)
//           .emit(
//             'message',
//             formatMessage(botName, `${user.username} has joined the chat`)
//           );
    
//         // Send users and room info
//         io.to(user.room).emit('roomUsers', {
//             room: user.room,
//             users: getRoomUsers(user.room)
//         });
//     });

//     socket.emit('message', 'Well done!');
// });

// const uri = "mongodb://localhost:27017/";

// app.get('/family/:id', async (req, res) => {
//     const id = parseInt(req.params.id);
//     const client = new MongoClient(uri);
//     await client.connect();
//     const family = await client.db('fridchen').collection('family').findOne({"id": id});
//     await client.close();
//     res.status(200).send({
//         "status": "ok",
//         "family": family
//     });
// })

// app.post('/family')

// app.get('/menu/:family_id')

// app.post('/menu/:family_id')

// app.get('/fridge_item/:family_id')

// app.post('/fridge_item/:family_id')

// app.delete('/fridge_item/:family_id')

// app.get('/shopping_list/:family_id')

// app.post('/shopping_list/:family_id')

// app.delete('/shopping_list/:family_id')

// app.get('/tags')

// app.get('/units')

// app.post('/ingredients')

// app.post('/family_ingredient')

// app.get('/all_data/:family_id')