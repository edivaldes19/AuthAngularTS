import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public miFormulario: FormGroup = this.fb.group({
    email: ['recio-manuel@outlook.com', [Validators.required, Validators.email]],
    password: ['17040053', [Validators.required, Validators.minLength(6)]]
  })
  constructor(private fb: FormBuilder) { }
  login() { }
}