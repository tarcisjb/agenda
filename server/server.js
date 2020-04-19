var express = require('express');
var app = express();
var path =  require('path');

/*
app.get('/', function (req, res) {
    res.send('Hello World!');
});
*/

app.set('clientPath', path.join(__dirname, '../..', 'agenda/client/'));
console.log(app.get('clientPath'));
app.use(express.static(app.get('clientPath')));

app.get('/', function(req,res) {
    res.sendFile(app.get('clientPath') + 'index.html');
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(3000, function () {
    console.log('Servidor escutando na porta: ' + this.address().port);
    console.log('Para encerrar a execução do servidor digite CTRL + C');
});