import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-async-stream',
  template: `
      <div>{{ personName | async }}</div>
    `
})
export class AsyncComponent {
  personName: Observable<string>;
}
