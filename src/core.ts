import {BrowserWindow, globalShortcut} from "electron"
import {WindowConfig, DEV_MODE, PROD_MODE, DEBUG_MODE} from "./config"

/**
 * Class that will handle all the ipc between all the BrowserViews
 */
export class WindowManager {

    config: WindowConfig = {
        width: 1920,
        height: 1080,
    }
    window: BrowserWindow

    constructor(window: any = null, configs: WindowConfig = null) {
        if (configs) {
            this.config = configs
        }
        this.window = window
    }

    initialize(options: any = null) {
        let configOptions = {
            width: this.config.width,
            height: this.config.height,
            // titleBarStyle: this.configs.titleBarStyle || 'customButtonsOnHover',
            resizable: this.config.resizable !== undefined ? this.config.resizable : true,
            backgroundColor: this.config.backgroundColor || "#4d4d4d",
            fullscreen: this.config.fullscreen || false,
            fame: this.config.frame || false
        }
        this.window = new BrowserWindow(options || configOptions)

        if (this.config.title) {
            this.window.setTitle(this.config.title)
        }
        this.window.setMenu(null)

        if (DEV_MODE || PROD_MODE || DEBUG_MODE) {
            // allow to open the dev tool on DEV_MODE
            globalShortcut.register('CommandOrControl+Shift+I', () => {
                this.window.webContents.toggleDevTools()
            })
        }

        // first creation of all the browser views
        this.load()
    }

    /**
     * Add a browser view to the page
     * @param config configurations of the view
     */
    load(config: WindowConfig | null = null) {

         if (!config) {
            config = this.config
        }

        // web console to debug
        if (DEV_MODE) {
            this.window.webContents.openDevTools()
        }

        switch (config.type || 'WEB') {
            case 'FILE':
                this.window.loadFile(config.source).catch(() => {
                })
                break
            case 'WEB':
                this.window.loadURL(config.source).catch(() => {
                })
                // try to reload indefinitely on fail
                this.window.webContents.on('did-fail-load', () => {
                    this.window.webContents.loadURL(config.source).catch(() => {
                    })
                })
                break
            default:
                console.log(`case ${config.type} not handled`)
        }
    }
}
