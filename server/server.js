const
  express = require('express'),
  app     = express(),
  fs      = require('fs'),
  blocks  = require('./blocks')

app.get('/api/hello', function (req, res) {
   res.send('Hello World')
})

app.get('/api/latest-blocks', function (req, res) {
   let lastBlock = parseInt(req.query.lastblock)
   //check that latest block pararmeter is not malformed
   if(isNaN(lastBlock))res.status(400).send('Bad Request')

   var path = getPathFromParameters()
   if(!fs.lstatSync(path).isFile()) new Error('Path parameters for JSON file is either not a file or is malformed')
   else {
      let isSim = isSimulation()
      let contents = (JSON.parse(fs.readFileSync(path)).filter((item) => {
         if(isSim) return item.index > lastBlock && item.index < lastBlock + 2
         else return item.index > lastBlock}))
         //console.log('lastBlock: ' + lastBlock + " nextBlockArraySize: "+ contents.length);
      res.send(contents)
   }
 })

const isSimulation = () => {
  let isSim;
  process.argv.forEach(function (val, index, array) {
    if(val === '-s') isSim = true
  });
  return isSim;
}

const getPathFromParameters = () => {
  let path;
  process.argv.forEach(function (val, index, array) {
    if(val === '-p'){
      path = process.argv[index+1]
    }
  });
  return path;
}

var server = app.listen(5000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
