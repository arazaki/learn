const express = require('express');

const app = express();

app.use('/users',(req, res, next) => {
    console.log('Middleware Users');
    res.send("Users here!");
});

app.use('/', (req, res, next) => {
    console.log('Slash only');
    res.send("Sorry. Slash only.");
});

app.listen(3000);