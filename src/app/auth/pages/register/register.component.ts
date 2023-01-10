import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  public miFormulario: FormGroup = this.fb.group({
    name: ['Edgar Manuel', [Validators.required, Validators.minLength(5)]],
    email: ['recio-manuel@outlook.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }
  registrar() {
    const { name, email, password } = this.miFormulario.value
    this.authService.create(name, email, password)
      .subscribe(ok => ok === true
        ? this.router.navigateByUrl('/dashboard')
        : Swal.fire('Error', ok, 'error'))
  }
}