import { app, Menu } from 'electron'

export default function createMenu(win) {
  const template = [
    ...(process.platform === 'darwin' ? [{
      label: app.getName(),
      submenu: [
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    {
      label: "View",
      submenu: [
        {
          label: "Search",
          accelerator: "CommandOrControl+F",
          click: () => win.webContents.send('search')
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click: () => win.toggleDevTools()
        },
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'togglefullscreen' },
        ...(process.platform === 'darwin' ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [
            { role: 'close' }
          ])
      ]
    }
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}