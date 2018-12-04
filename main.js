const { app, ipcMain, BrowserWindow } = require('electron')

// https://www.npmjs.com/package/smartcardreader
const SmartCardReader = require('smartcardreader');

let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#ffffff',
        icon: `file://${__dirname}/dist/well-smile/assets/logo.png`
    })


    win.loadURL(`file://${__dirname}/dist/well-smile/index.html`)

    //// uncomment below to open the DevTools.
    // win.webContents.openDevTools()

    // Event when the window is closed.
    win.on('closed', function () {
        win = null
    })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
        createWindow()
    }
})
var count = 0;
ipcMain.on('ping', (event, arg) => {
    event.sender.send('count', ++count);
})

SmartCardReader.on('connect', (device) => {
    console.info(`connected: ${device}`);
});
SmartCardReader.on('disconnect', (device) => {
    console.info(`disconnected: ${device}`);
});
SmartCardReader.on('read', (data) => {
    console.info(`read: ${data}`);
});
