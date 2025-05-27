import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CustomersTopBarComponent } from '../customers-top-bar/customers-top-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomerNavBarComponent } from '../customer-nav-bar/customer-nav-bar.component';

@Component({
  selector: 'app-envoyer-commande',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    MatMomentDateModule,
    CustomersTopBarComponent,
    CustomerNavBarComponent
  ],
  templateUrl: './envoyer-commande.component.html',
  styleUrl: './envoyer-commande.component.scss'
})
export class EnvoyerCommandeComponent {



  user1 = { name: 'Jean Dupont',telephone: '698763421'};

  user2 = { name: 'axel',telephone: '681195346'};
  info_expediteur = false;
  info_destinataire = false;
  isSidenavOpened = true;
 


toggleSidenav() {
  this.isSidenavOpened = !this.isSidenavOpened;
  console.log(this.isSidenavOpened)
}

  toggleInfo_expediteur() : void{
    this.info_expediteur= !this.info_expediteur
     console.log( "expediteur:"+this.info_expediteur)
   
  }


  toggleInfo_destinataire() : void{
    this.info_destinataire= !this.info_destinataire
     console.log( "destinataire:"+this.info_destinataire)
    
   
  }

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      formsArray: this.fb.array([this.createFormGroup()]) // Initialize with one form group
    });
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      type_colis:  ['', Validators.required],
      quantité:  ['', Validators.required],
      montant: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      recommandation: ['', Validators.required],
      point_depart: ['', Validators.required],
      point_d_arrivee: ['', Validators.required],
    });
  }

  addForm() {
    (this.form.get('formsArray') as FormArray).push(this.createFormGroup());
  }

  onSignup() {
    // Handle form submission logic here
    console.log(this.form.value);
  }

  get formsArray(): FormArray {
    return this.form.get('formsArray') as FormArray;
  }







}
