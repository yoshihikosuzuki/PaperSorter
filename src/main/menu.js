import { Menu } from 'electron'

export default function createMenu(win) {
  const template = [
    {
      label: "Edit",
      submenu: [
        {
          label: "Search",
          accelerator: "CommandOrControl+F",
          click: () =>  win.webContents.send('search')
        }
      ]
    }
  ]
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}