import { Component } from '@angular/core';

@Component({
  selector: 'app-dom-testing-component',
  template: `
    <div class="container" *ngIf="isVisible">Hi there!</div>
    <button (click)="isVisible = !isVisible">toggle</button>
  `
})
export class DomTestingComponent {
  isVisible = false;
}
