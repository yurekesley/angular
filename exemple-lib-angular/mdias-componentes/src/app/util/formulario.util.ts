import { FormGroup, AbstractControl } from '@angular/forms';

export function marcarComoTocado( formulario: FormGroup ) {
  for (const key in  formulario.controls) {
    if (formulario.controls.hasOwnProperty(key)) {
      const control: any = formulario.controls[key];
      if (control.controls) {
        this.marcarComoTocado(control);
      } else {
        control.markAsTouched();
      }
    }
  }
}

export function marcarComoNaoTocado( formulario: FormGroup) {
  for (const key in  formulario.controls) {
    if (formulario.controls.hasOwnProperty(key)) {
      const control: any = formulario.controls[key];
      if (control.controls) {
        this.marcarComoNaoTocado(control);
      } else {
        control.markAsUntouched();
      }
    }
  }
}


export function limparControle (controle: AbstractControl) {
  controle.reset();
}


export function resetar( formulario: FormGroup ) {
  for (const key in  formulario.controls) {
    if (formulario.controls.hasOwnProperty(key)) {
      const control: any = formulario.controls[key];
      if (control.controls) {
        this.resetar(control);
      } else {
        if (control.enabled) {
          control.setValue(undefined);
          control.markAsUntouched();
        }
      }
    }
  }
}

