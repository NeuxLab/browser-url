const { osa } = require('cc')
const { URL } = require('url')

module.exports = function(record) {
  if (record.ancestor.type !== 'core.text') { return }

  let getURL = null
  const sourceID = record.ancestor.source.identifier
  switch (sourceID) {
    case 'com.google.Chrome':
      getURL = getURLFromChrome()
      break
    case 'org.mozilla.firefox':
      getURL = getURLFromFirefox()
      break
    case 'com.apple.Safari':
      getURL = getURLFromSafari()
      break
    default:
      return
  }

  return getURL().then(url => {
    try {
      const urlObject = new URL(url)
      if (urlObject.protocol !== 'http:' && urlObject.protocol != 'https:') {
        throw new Error(`Unsupported protocol: ${urlObject.protocol}`)
      }

      record.ancestor.source.url = url
    } catch (e) {
      console.warn(`Failed to get url from ${sourceID}: ${e.message}`, url)
    }
  })
}

function getURLFromChrome() {
  return osa(() => {
    return Application('Google Chrome').windows[0].activeTab.url.get()
  })
}

function getURLFromFirefox() {
  return osa(() => {
    const app = Application.currentApplication()
    app.includeStandardAdditions = true

    const se = Application('System Events')
    se.keystroke('l', { using: ['command down'] })
    se.keystroke('c', { using: ['command down'] })
    delay(0.2)
    return app.theClipboard()
  })
}

function getURLFromSafari() {
  return osa(() => {
    return Application('Safari').windows[0].currentTab.url.get()
  })
}