const
  fs   = require('fs'),
  Tail = require('tail').Tail

class JSONLogFile {
  /**
   * Initialize JSON log file based block collection
   * @param {Object} opts - customization
   */
  constructor(opts={}) {
    if (!opts.path) throw new Error("opts.path is required")
    Object.assign(this, opts)
    this.blocks = []
    this.startTail()
  }

  /**
   * Wait for file to exist and then start tailing it.
   */
  startTail() {
    let messageSent = false
    this.tailWait = setInterval(function(){
      try {
        fs.accessSync(this.path)
        let tailOptions = this.tailOptions ? this.tailOptions : { fromBeginning: true }
        this.tail = new Tail(this.path, tailOptions)
        this.tail.on('line', this.parseLineFn(this.blocks).bind(this))
        this.tail.on('error', console.warn)
        this.tail.watch()
        clearInterval(this.tailWait)
      } catch (err) {
        if (!messageSent) {
          console.warn(`waiting for ${this.path} to exist`)
          messageSent = true
        }
      }
    }.bind(this), 1000)
  }

  /**
   * Override this method if the JSON-parsed block data needs to be transformed before storing.
   * By default, it returns the same object it's passed.
   * @param {Object} data - JSON-parsed block data
   * @returns {Object} Transformed block data
   */
  transformData(data) {
    return data
  }

  /**
   * Override this method if you want to filter out data.
   * This runs after `this.transformData(data)`, and
   * the function should return true if the data should be included and false if not.
   * @param {Object} data - Data that may be included in `this.blocks` array
   * @returns {Boolean} True if data should be included
   */
  filterData(data) {
    return true
  }

  /**
   * Return a function for parsing log lines that's suitable for passing to tail.
   * @param {Array} blocks - an array that will be used for block collection
   * @returns {Function} a function that will parse JSON log lines
   */
  parseLineFn(blocks) {
    var line = 0
    return function(data) {
      line++
      try {
        let blockData = this.transformData(JSON.parse(data))
        blocks.push(blockData)
      }
      catch (e) {
        console.warn(`JSON parse error on line %d: '%s' ${e}`, line, data)
      }
    }
  }

  /**
   * Return blocks from n to the last block.
   * @param {Number} n - The block to start from
   */
  blocksSince(n) {
    return this.blocks.filter((item) => {
      if (this.isSimulation) return item.index > n && item.index < n + 2
      else return item.index > n
    })
  }
}

class ArtemisLogFile extends JSONLogFile {
  /**
   * Translate some fields so that the React component, Dag, can find what it's looking for.
   * @param {Object} data - block data from the Artemis log
   * @returns {Object} transformed block data
   */
  transformData(data) {
    data.headBlockRoot       = data.block_body
    data.parentHeadBlockRoot = data.block_parent_root
    //delete data.block_body
    //delete data.block_parent_root
    return data
  }

  /**
   * Filter out the objects that don't have the necessary fields for rendering
   * @param {Object} data - block data from the Artemis log
   * @returns {Boolean} true if the object looks like a block that contains renderable data
   */
  filterData(data) {
    return (data.headBlockRoot && data.parentHeadBlockRoot)
  }
}

module.exports = {
  JSONLogFile,
  ArtemisLogFile
}
