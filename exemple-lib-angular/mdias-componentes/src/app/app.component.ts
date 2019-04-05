import { MdbHttpService } from './modulos/http/mdb-http.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private mdbHTTP: MdbHttpService) {
  }
}
