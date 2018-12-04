import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'well-smile';
  constructor(private _electronService: ElectronService) {
  }
  public playPingPong() {
    if (this._electronService.isElectronApp) {
      this._electronService.ipcRenderer.send('ping', 'ping');
      this._electronService.ipcRenderer.on('count', (event: any, arg: any) => {
        console.log(arg);
      });
    }
  }
}

