let disposable = null

module.exports = {

  activate() {
    if (!['win32', 'darwin'].includes(process.platform)) return

    const handler = process.platform === 'darwin' ? require('./darwin') : require('./win32')
    disposable = cc.hooks.register('before-create', handler)
  },

  deactivate() {
    disposable.dispose()
  }
}