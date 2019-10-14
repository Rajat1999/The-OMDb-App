var express = require('express');
var app = express();

var request = require('request');
const PORT = process.env.PORT;

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.render('search');
});

app.get('/results', (req, res) => {
    var query = req.query.search;
    var url = 'http://www.omdbapi.com/?apikey=thewdb&s=' + query;
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            res.render('results', {data: result});
        }
    });
});

app.listen(PORT || '3030', () => {
    console.log('Server started at port: 3030');
});
