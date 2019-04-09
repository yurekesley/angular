import { Input, Component } from '@angular/core';

@Component({
  selector: 'app-input',
  template: `{{ message }}`
})
export class InputComponent {
  @Input() message: string;
}
