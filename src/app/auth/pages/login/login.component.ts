import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public miFormulario: FormGroup = this.fb.group({
    email: ['recio-manuel@outlook.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }
  login() {
    const { email, password } = this.miFormulario.value
    this.authService.login(email, password)
      .subscribe(ok => ok === true
        ? this.router.navigateByUrl('/dashboard')
        : Swal.fire('Error', ok, 'error'))
  }
}