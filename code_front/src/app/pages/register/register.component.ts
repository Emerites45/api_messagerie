import { Component} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import {MatInputModule}  from '@angular/material/input'
import {MatSelectModule}  from '@angular/material/select'
import {MatDatepickerModule}  from '@angular/material/datepicker'
import {MatMomentDateModule} from  '@angular/material-moment-adapter'
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';
import { take } from 'rxjs';
import { RegisterForm } from '../../core/forms/register.form';
import { SessionService } from '../../core/services/session.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService,
  ) {
    this.form = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.minLength(4)]),
      prenoms: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telephone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      password: new FormControl('', [Validators.required]),
      ville: new FormControl('', [Validators.required]),
      conpassword: new FormControl('', [Validators.required]),
      isChecked1: new FormControl(false, [Validators.requiredTrue]),
      isChecked2: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  onSignup() {
    if (this.form.valid) {
      const formValues = this.form.value;
      const registerForm: RegisterForm = {
        firstName: formValues.prenoms,
        lastName: formValues.nom,
        phone: '+237' + formValues.telephone,
        city: formValues.ville,
        email: formValues.email,
        password: formValues.password,
      };
      this.authService
        .register(registerForm)
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.sessionService.logIn(data.response);
            this.router.navigate(['/customer']);
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      console.log('Le formulaire est invalide', this.form.errors);
    }
  }

  get password() {
    return this.form.get('password');
  }

  get conpassword() {
    return this.form.get('conpassword');
  }

  passwordsMatch(): boolean {
    return this.password?.value === this.conpassword?.value;
  }
}


