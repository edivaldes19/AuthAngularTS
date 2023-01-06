import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  public miFormulario: FormGroup = this.fb.group({
    name: ['Edgar Manuel', [Validators.required, Validators.minLength(5)]],
    email: ['recio-manuel@outlook.com', [Validators.required, Validators.email]],
    password: ['17040053', [Validators.required, Validators.minLength(6)]]
  })
  constructor(private fb: FormBuilder) { }
  signIn() { }
}