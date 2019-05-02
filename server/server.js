const
  express = require('express'),
  app     = express(),
  fs      = require('fs'),
  program = require('commander'),
  blocks  = require('./blocks'),
  package = require('../package.json')

let db = undefined

app.get('/api/hello', function (req, res) {
  res.send('Hello World')
})

app.get('/api/latest-blocks', function (req, res) {
  let lastBlock = parseInt(req.query.lastblock)
  //check that latest block pararmeter is not malformed
  if (isNaN(lastBlock)) {
    res.status(400).send('Bad Request')
    return
  }
  let contents = db.blocksSince(lastBlock)
  res.json(contents)
  return
})

// main
program
  .version(package.version)
  .option('-s, --simulation', 'Simulate a slow stream on /api/latest-blocks')
  .option('-p, --path [string]', 'Path to JSON log file')
  .parse(process.argv)

let path = program.path
let isSimulation = program.simulation
db = new blocks.ArtemisLogFile({ path, isSimulation })

var server = app.listen(5000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
