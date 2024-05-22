import { app, ipcMain } from 'electron'
import { WindowManager } from './src/core'
import * as configsDev from './src/config/dev.json'
import * as configsProd from './src/config/prod.json'
import {DEV_MODE} from "./src/config";

let configs = configsProd
if (DEV_MODE) {
  configs = configsDev
}
const manager = new WindowManager(null, configs)

/**
 * Initialization of the electron app
 * Handled by the ElectronManager class
 */
app.whenReady().then(() => {
  manager.initialize()
})

app.on('window-all-closed', () => {
  app.quit()
})
