const { app, ipcMain, BrowserWindow } = require('electron')
//const { NFC } = require('nfc-pcsc');

let win;
//const nfc = new NFC();

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

//--------------
// nfc.on('reader', reader => {
// 	console.log(`${reader.reader.name}  device attached`);
// 	reader.aid = 'F222222222';
// 	reader.on('card', card => {
// 		console.log(`${reader.reader.name}  card detected`, card);
// 	});

// 	reader.on('card.off', card => {
// 		console.log(`${reader.reader.name}  card removed`, card);
// 	});

// 	reader.on('error', err => {
// 		console.log(`${reader.reader.name}  an error occurred`, err);
// 	});

// 	reader.on('end', () => {
// 		console.log(`${reader.reader.name}  device removed`);
// 	});

// });

// nfc.on('error', err => {
// 	console.log('an error occurred', err);
// });
