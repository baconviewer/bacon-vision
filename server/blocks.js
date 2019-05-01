const
  Tail = require('tail').Tail,
  fs   = require('fs')

/**
 * Return a function for parsing log lines that's suitable for passing to tail.
 * @param {Array} blocks - an array that will be used for block collection
 * @returns {Function} a function that will parse JSON log lines
 */
function parseFn(blocks) {
  var line = 0
  return function(data) {
    line++
    try {
      let blockData = JSON.parse(data)
      blocks.push(blockData)
    }
    catch (e) {
      console.warn("JSON parse error on line %d: '%s'", line, data)
    }
  }
}

class Artemis {
  /**
   * Initialize Artemis log file based block collection
   * @param {Object} opts - customization
   */
  constructor(opts={}) {
    if (!opts.path) throw new Error("opts.path is required")
    Object.assign(this, opts)
    let tailOptions = this.tailOptions ? this.tailOptions : { fromBeginning: true }
    this.blocks = []
    this.tail = new Tail(this.path, tailOptions)
    this.tail.on('line', parseFn(this.blocks))
    this.tail.on('error', console.warn)
  }

  /**
   * Start collecting block data.
   */
  start() {
    this.tail.watch()
  }

  /**
   * Return blocks from n to the last block.
   * @param {Number} n - The block to start from
   */
  blocksSince(n) {
    this.blocks.filter((item) => {
      if (this.isSimulation) return item.index > n && item.index < n + 2
      else return item.index > n
    })
  }
}

module.exports = {
  parseFn,
  Artemis
}
