const express = require('express');
const app = express();
const commentRoutes = require('./routes/blogRoutes');
const { connectDB } = require('./models/blogModel');

let port = process.env.PORT || 3040;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(commentRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Express server started on port ${port}`);
    connectDB();
});
