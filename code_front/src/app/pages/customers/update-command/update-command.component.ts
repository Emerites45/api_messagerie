import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {

  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-update-command',
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
  templateUrl: './update-command.component.html',
  styleUrl: './update-command.component.scss'
})
export class UpdateCommandComponent {

  form: FormGroup;

  constructor(
    private router: Router,
    
  ) {
    this.form = new FormGroup({
      nom_expediteur: new FormControl (),
      tel_expediteur: new FormControl ('',[Validators.pattern('^[0-9]*$')]),
      nom_destinataire: new FormControl (),
      tel_destinataire: new FormControl ('',[Validators.pattern('^[0-9]*$')]),
      type_colis: new FormControl (),
      quantite: new FormControl (),
      montant: new FormControl (),
      recommandation:  new FormControl (),
      point_depart: new FormControl (),
      point_arrivee: new FormControl (),
    });
  }



  onSignup() {
    // Handle form submission logic here
    console.log(this.form.value);
  }

}
