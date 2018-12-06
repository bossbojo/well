import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';
const ab2str = require('arraybuffer-to-string');
const hexToArrayBuffer = require('hex-to-array-buffer');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'well-smile';
  thaicard: thaicard;
  constructor(private _electronService: ElectronService) {
  }
  public playPingPong() {
    if (this._electronService.isElectronApp) {
      this._electronService.ipcRenderer.send('ping', 'ping');
      this._electronService.ipcRenderer.on('count', (event: any, arg: any) => {
        this.thaicard = <thaicard>JSON.parse(arg);
        const arr = hexToArrayBuffer(this.thaicard.CMD_CID);
        const arr2 = hexToArrayBuffer(this.thaicard.CMD_THFULLNAME);
        const arr3 = hexToArrayBuffer(this.thaicard.CMD_ENFULLNAME);
        const arr4 = hexToArrayBuffer(this.thaicard.CMD_ADDRESS);
        console.log(ab2str(arr));
        console.log(ab2str(arr2));
        console.log(ab2str(arr3));
        console.log(ab2str(arr4));
      });
    }
  }
}

export class thaicard {
  constructor(
    public CMD_CID,
    public CMD_THFULLNAME,
    public CMD_ENFULLNAME,
    public CMD_BIRTH,
    public CMD_GENDER,
    public CMD_ISSUER,
    public CMD_ISSUE,
    public CMD_EXPIRE,
    public CMD_ADDRESS,
    public CMD_PHOTO: []
  ) { }
}

