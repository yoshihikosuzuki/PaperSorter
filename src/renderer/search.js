import { remote, ipcRenderer } from 'electron'
import { FindInPage } from 'electron-find'

const findInPage = new FindInPage(remote.getCurrentWebContents())
ipcRenderer.on('search', (e, args) => {
  findInPage.openFindWindow()
})