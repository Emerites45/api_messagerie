import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { take } from 'rxjs';
import { SessionService } from '../../core/services/session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService,
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onlogIn() {
    if (this.form.valid) {
      this.authService
        .login(this.form.value)
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

  get estValide() {
    return this.form.valid;
  }
}
