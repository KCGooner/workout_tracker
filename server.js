const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000
const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//mongoose connect string, using the localhost 'fitnesstracker'
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', { useNewUrlParser: true });

//Routes
app.use(require("./routes/html-routes"));
// app.use(require("./routes/api-routes"));

//Validation server is running on correct port
app.listen(PORT, () => {
    console.log(`App listening on Port: ${PORT}!`);
});