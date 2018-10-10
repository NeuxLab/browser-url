const CF_HTML = 'HTML Format'

let clipboard = null

module.exports = function(record) {
  if (clipboard == null) { clipboard = require('electron').clipboard }

  if (record.ancestor.type !== 'core.text') { return }
  if (clipboard.has(CF_HTML)) {
    const match = clipboard.read(CF_HTML).match(/^SourceURL:(.+)$/m)
    if (match && match.length == 2 && match[1].length > 0) {
      record.ancestor.source.url = match[1]
    }
  }
}