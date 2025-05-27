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
import { CustomerNavBarComponent } from '../customer-nav-bar/customer-nav-bar.component';
import { CustomersTopBarComponent } from '../customers-top-bar/customers-top-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';



@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink,
    FormsModule ,
    CustomerNavBarComponent,
    CustomersTopBarComponent
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {form : FormGroup
  
  isSidenavOpened = true;

toggleSidenav() {
  this.isSidenavOpened = !this.isSidenavOpened;
  console.log(this.isSidenavOpened)
}

  constructor(private router: Router) {
    this.form = new FormGroup({
      nom: new FormControl('',[Validators.required,Validators.minLength(4)]),
      prenoms: new FormControl('',[Validators.required,Validators.minLength(4)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      telephone: new FormControl ('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      password: new FormControl ('', [Validators.required,]),
      ville: new FormControl ('', [Validators.required,]),
      conpassword: new FormControl ('', [Validators.required,]),
     
     
    },
 
  );
  }
  

  onSignup() {
    
    if (this.form.valid) {
      this.router.navigate(['/login']);
    } else {
      console.log('Le formulaire est invalide', this.form.errors);
      
    }}


    get password() {
      return this.form.get('password');
    }
  
    get conpassword() {
      return this.form.get('conpassword');
    }
  
    onSubmit() {
      if (this.form.valid) {
       
        console.log('Form Submitted!', this.form.value);
      }
    }
  
    passwordsMatch(): boolean {
      console.log("password"+this.password?.value)
      console.log("conpassword"+this.conpassword?.value)
      return this.password?.value === this.conpassword?.value;
     
    }
  }