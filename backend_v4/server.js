const express = require('express');
const mongoose = require('mongoose');
const app = require('./app');

mongoose
    .connect('mongodb+srv://kikat:<PASSWORD>@cluster0-ple5e.mongodb.net/project1', {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log('MongoDB is connected');
    })
    .catch(err => {
        console.log('ERROR:', err.message);
    })

app.listen('3002', (req, res) => {
    console.log('Server listening on port 3002');
});
