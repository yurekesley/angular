import { Output, Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-output-component',
  template: `
    <button (click)="doGreet()">Do greet</button>
  `
})
export class OutputComponent {
  @Output() greet: EventEmitter<string> = new EventEmitter<string>();

  doGreet() {
    this.greet.emit('Hi');
  }
}
