module.exports = {

  initialize() {
    if (!['win32', 'darwin'].includes(process.platform)) return

    const handler = process.platform === 'darwin' ? require('./darwin') : require('./win32')
    cc.hooks.register('before-create', handler)
  }
}