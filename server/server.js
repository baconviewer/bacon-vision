var express = require('express');
var app = express();
var fs = require('fs');

app.get('/api/hello', function (req, res) {
   res.send('Hello World');
})

app.get('/api/latest-blocks', function (req, res) {
   let lastBlock = req.query.lastblock;
   //console.log('lastBlock: ' + lastBlock);
   let contents = (JSON.parse(fs.readFileSync(__dirname + '/../src/artemis.json','utf8')).filter((item) => {
      return item.index > lastBlock}));
   res.send(contents);
 })

var server = app.listen(5000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})