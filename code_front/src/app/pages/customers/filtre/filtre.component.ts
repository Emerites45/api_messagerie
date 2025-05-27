import { Component, effect, EventEmitter, Injector, Output, signal } from '@angular/core';
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
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from  '@angular/material/table'



export interface commande {
  type_colis: string;
 montant_collecter: number;
 tel_destinataire: number;
 quantite: number;
 point_depart: string;
 point_arriver: string;
}

var responce= [
  {
    type_colis: "Document",
    montant_collecter: 5.0,
    tel_destinataire: 123456789,
    quantite: 1,
    point_depart: "Paris",
    point_arriver: "Lyon"
},
{
    type_colis: "Colis standard",
    montant_collecter: 10.0,
    tel_destinataire: 987654321,
    quantite: 2,
    point_depart: "Marseille",
    point_arriver: "Nice"
},
 ]
@Component({
  selector: 'app-filtre',
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
    FormsModule,
    MatMomentDateModule,
    MatTableModule,
  ],
  templateUrl: './filtre.component.html',
  styleUrl: './filtre.component.scss'
})
export class FiltreComponent {
 

  @Output () response_emit = new EventEmitter<commande[]>()
  @Output () status_emit = new EventEmitter<String>()


  status= signal('');
  

  form: FormGroup;

  constructor(private router: Router,
              private injector: Injector
  ) {
    this.form = new FormGroup({
      status: new FormControl('', ),
      point_depart: new FormControl('', ),
      point_arrivee: new FormControl('',),
      mot_cle: new FormControl('',),
      date_depart: new FormControl('', ),
      date_arrivee: new FormControl('',),
    
     
    },)


  
  }

  status_effect(): void {
    
    effect(()=> {
      console.log("la valeur est : "+ this.status())
     
   },{
    injector: this.injector
   })
  }

  update_status(event: any){
    this.status.update(status =>  event.value)
   
    this.status_effect()
  }




  onSignup() {
    
    // appel au back-end 

    this.status_emit.emit(this.status())
   
this.response_emit.emit(responce)
     
    console.log(this.form.get('status')?.value);
  }

}
