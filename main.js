const { app, ipcMain, ipcRenderer, BrowserWindow } = require('electron')

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
    event.sender.send('count', JSON.stringify(thaicard));
})


'use strict';

const smartcard = require('smartcard');
const Devices = smartcard.Devices;
const Iso7816Application = smartcard.Iso7816Application;

const devices = new Devices();
const APDU_TH = {
    CMD_SELECT: [0x00, 0xA4, 0x04, 0x00, 0x08, 0xA0, 0x00, 0x00, 0x00, 0x54, 0x48, 0x00, 0x01],
    CMD_CID: [0x80, 0xb0, 0x00, 0x04, 0x02, 0x00, 0x0d],
    CMD_THFULLNAME: [0x80, 0xb0, 0x00, 0x11, 0x02, 0x00, 0x64],
    CMD_ENFULLNAME: [0x80, 0xb0, 0x00, 0x75, 0x02, 0x00, 0x64],
    CMD_BIRTH: [0x80, 0xb0, 0x00, 0xD9, 0x02, 0x00, 0x08],
    CMD_GENDER: [0x80, 0xb0, 0x00, 0xE1, 0x02, 0x00, 0x01],
    CMD_ISSUER: [0x80, 0xb0, 0x00, 0xF6, 0x02, 0x00, 0x64],
    CMD_ISSUE: [0x80, 0xb0, 0x01, 0x67, 0x02, 0x00, 0x08],
    CMD_EXPIRE: [0x80, 0xb0, 0x01, 0x6F, 0x02, 0x00, 0x08],
    CMD_ADDRESS: [0x80, 0xb0, 0x15, 0x79, 0x02, 0x00, 0x64],
    CMD_PHOTO: [
        [0x80, 0xb0, 0x01, 0x7B, 0x02, 0x00, 0xFF],
        [0x80, 0xb0, 0x02, 0x7A, 0x02, 0x00, 0xFF],
        [0x80, 0xb0, 0x03, 0x79, 0x02, 0x00, 0xFF],
        [0x80, 0xb0, 0x04, 0x78, 0x02, 0x00, 0xFF],
        [0x80, 0xb0, 0x05, 0x77, 0x02, 0x00, 0xFF],
        [0x80, 0xb0, 0x06, 0x76, 0x02, 0x00, 0xFF],
        [0x80, 0xb0, 0x07, 0x75, 0x02, 0x00, 0xFF],
        [0x80, 0xb0, 0x08, 0x74, 0x02, 0x00, 0xFF],
        [0x80, 0xb0, 0x09, 0x73, 0x02, 0x00, 0xFF],
        [0x80, 0xb0, 0x0A, 0x72, 0x02, 0x00, 0xFF],
        [0x80, 0xb0, 0x0B, 0x71, 0x02, 0x00, 0xFF],
        [0x80, 0xb0, 0x0C, 0x70, 0x02, 0x00, 0xFF],
        [0x80, 0xb0, 0x0D, 0x6F, 0x02, 0x00, 0xFF],
        [0x80, 0xb0, 0x0E, 0x6E, 0x02, 0x00, 0xFF],
        [0x80, 0xb0, 0x0F, 0x6D, 0x02, 0x00, 0xFF],
        [0x80, 0xb0, 0x10, 0x6C, 0x02, 0x00, 0xFF],
        [0x80, 0xb0, 0x11, 0x6B, 0x02, 0x00, 0xFF],
        [0x80, 0xb0, 0x12, 0x6A, 0x02, 0x00, 0xFF],
        [0x80, 0xb0, 0x13, 0x69, 0x02, 0x00, 0xFF],
        [0x80, 0xb0, 0x14, 0x68, 0x02, 0x00, 0xFF]
    ]
}
const thaicard = {
    CMD_CID: null,
    CMD_THFULLNAME: null,
    CMD_ENFULLNAME: null,
    CMD_BIRTH: null,
    CMD_GENDER: null,
    CMD_ISSUER: null,
    CMD_ISSUE: null,
    CMD_EXPIRE: null,
    CMD_ADDRESS: null,
    CMD_PHOTO: []
}

devices.on('device-activated', event => {
    const currentDevices = event.devices;
    let device = event.device;
    console.log(`Ready..........`);
    console.log(`Device '${device}' activated, devices: ${currentDevices}`);
    device.on('card-inserted', event => {
        console.log(event);
        let card = event.card;
        const application = new Iso7816Application(card);
        application.issueCommand(APDU_TH.CMD_SELECT).then(response => {
            application.issueCommand(APDU_TH.CMD_CID).then((res) => {
                thaicard.CMD_CID = res.data;
                application.issueCommand(APDU_TH.CMD_THFULLNAME).then((res) => {
                    thaicard.CMD_THFULLNAME = res.data;
                    application.issueCommand(APDU_TH.CMD_ENFULLNAME).then((res) => {
                        thaicard.CMD_ENFULLNAME = res.data;
                        application.issueCommand(APDU_TH.CMD_BIRTH).then((res) => {
                            thaicard.CMD_BIRTH = res.data;
                            application.issueCommand(APDU_TH.CMD_GENDER).then((res) => {
                                thaicard.CMD_GENDER = res.data;
                                application.issueCommand(APDU_TH.CMD_ISSUER).then((res) => {
                                    thaicard.CMD_ISSUER = res.data;
                                    application.issueCommand(APDU_TH.CMD_ISSUE).then((res) => {
                                        thaicard.CMD_ISSUE = res.data;
                                        application.issueCommand(APDU_TH.CMD_EXPIRE).then((res) => {
                                            thaicard.CMD_EXPIRE = res.data;
                                            application.issueCommand(APDU_TH.CMD_ADDRESS).then((res) => {
                                                thaicard.CMD_ADDRESS = res.data;
                                                application.issueCommand(APDU_TH.CMD_PHOTO[0]).then((res) => {
                                                    thaicard.CMD_PHOTO.push(res.data);
                                                    application.issueCommand(APDU_TH.CMD_PHOTO[1]).then((res) => {
                                                        thaicard.CMD_PHOTO.push(res.data);
                                                        application.issueCommand(APDU_TH.CMD_PHOTO[2]).then((res) => {
                                                            thaicard.CMD_PHOTO.push(res.data);
                                                            application.issueCommand(APDU_TH.CMD_PHOTO[3]).then((res) => {
                                                                thaicard.CMD_PHOTO.push(res.data);
                                                                application.issueCommand(APDU_TH.CMD_PHOTO[4]).then((res) => {
                                                                    thaicard.CMD_PHOTO.push(res.data);
                                                                    application.issueCommand(APDU_TH.CMD_PHOTO[5]).then((res) => {
                                                                        thaicard.CMD_PHOTO.push(res.data);
                                                                        application.issueCommand(APDU_TH.CMD_PHOTO[6]).then((res) => {
                                                                            thaicard.CMD_PHOTO.push(res.data);
                                                                            application.issueCommand(APDU_TH.CMD_PHOTO[7]).then((res) => {
                                                                                thaicard.CMD_PHOTO.push(res.data);
                                                                                application.issueCommand(APDU_TH.CMD_PHOTO[8]).then((res) => {
                                                                                    thaicard.CMD_PHOTO.push(res.data);
                                                                                    application.issueCommand(APDU_TH.CMD_PHOTO[9]).then((res) => {
                                                                                        thaicard.CMD_PHOTO.push(res.data);
                                                                                        application.issueCommand(APDU_TH.CMD_PHOTO[10]).then((res) => {
                                                                                            thaicard.CMD_PHOTO.push(res.data);
                                                                                            application.issueCommand(APDU_TH.CMD_PHOTO[11]).then((res) => {
                                                                                                thaicard.CMD_PHOTO.push(res.data);
                                                                                                application.issueCommand(APDU_TH.CMD_PHOTO[12]).then((res) => {
                                                                                                    thaicard.CMD_PHOTO.push(res.data);
                                                                                                    application.issueCommand(APDU_TH.CMD_PHOTO[13]).then((res) => {
                                                                                                        thaicard.CMD_PHOTO.push(res.data);
                                                                                                        application.issueCommand(APDU_TH.CMD_PHOTO[14]).then((res) => {
                                                                                                            thaicard.CMD_PHOTO.push(res.data);
                                                                                                            application.issueCommand(APDU_TH.CMD_PHOTO[15]).then((res) => {
                                                                                                                thaicard.CMD_PHOTO.push(res.data);
                                                                                                                application.issueCommand(APDU_TH.CMD_PHOTO[16]).then((res) => {
                                                                                                                    thaicard.CMD_PHOTO.push(res.data);
                                                                                                                    application.issueCommand(APDU_TH.CMD_PHOTO[17]).then((res) => {
                                                                                                                        thaicard.CMD_PHOTO.push(res.data);
                                                                                                                        application.issueCommand(APDU_TH.CMD_PHOTO[18]).then((res) => {
                                                                                                                            thaicard.CMD_PHOTO.push(res.data);
                                                                                                                            application.issueCommand(APDU_TH.CMD_PHOTO[19]).then((res) => {
                                                                                                                                thaicard.CMD_PHOTO.push(res.data);
                                                                                                                                console.log(thaicard);
                                                                                                                            });
                                                                                                                        });
                                                                                                                    });
                                                                                                                });
                                                                                                            });
                                                                                                        });
                                                                                                    });
                                                                                                });
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }).catch(error => {
            console.error('Error:', error, error.stack);
        });
    });
    device.on('card-removed', event => {
        console.log(`Card removed from '${event.name}' `);
    });

});

devices.on('device-deactivated', event => {
    console.log(`Device '${event.device}' deactivated, devices: [${event.devices}]`);
});
