const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const commentRoutes = require('./routes/blogRoutes');
const { connectDB } = require('./models/blogModel');

let port = process.env.PORT || 3040;

const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(commentRoutes);

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('newComment', (comment) => {
        io.emit('newComment', comment); // Broadcast the new comment to all clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Express server started on port ${port}`);
    connectDB();
});

module.exports = app;
