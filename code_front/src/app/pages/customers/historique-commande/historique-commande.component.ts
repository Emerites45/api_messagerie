import { Component, effect, Injector, OnInit, signal } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
  FormsModule,
  ReactiveFormsModule, 
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from  '@angular/material/table'
import { FiltreComponent } from '../filtre/filtre.component';
import * as XLSX from 'xlsx';
import { CustomersTopBarComponent } from '../customers-top-bar/customers-top-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomerNavBarComponent } from '../customer-nav-bar/customer-nav-bar.component';






export interface commande {
     type_colis: string;
    montant_collecter: number;
    tel_destinataire: number;
    quantite: number;
    point_depart: string;
    point_arriver: string;
}

const ELEMENT_DATA: commande[] = [
  
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
    {
        type_colis: "Colis fragile",
        montant_collecter: 15.0,
        tel_destinataire: 147253689,
        quantite: 1,
        point_depart: "Bordeaux",
        point_arriver: "Toulouse"
    },
    {
        type_colis: "Colis alimentaire",
        montant_collecter: 20.0,
        tel_destinataire: 678123456,
        quantite: 3,
        point_depart: "Lille",
        point_arriver: "Strasbourg"
    },
    {
        type_colis: "Colis électronique",
        montant_collecter: 30.0,
        tel_destinataire: 765432189,
        quantite: 1,
        point_depart: "Nantes",
        point_arriver: "Rennes"
    },
    {
        type_colis: "Colis de vêtements",
        montant_collecter: 25.0,
        tel_destinataire: 612345678,
        quantite: 5,
        point_depart: "Lyon",
        point_arriver: "Marseille"
    },
    {
        type_colis: "Colis de livres",
        montant_collecter: 12.0,
        tel_destinataire: 321456789,
        quantite: 4,
        point_depart: "Strasbourg",
        point_arriver: "Nancy"
    },
    {
        type_colis: "Colis de jouets",
        montant_collecter: 18.0,
        tel_destinataire: 543216789,
        quantite: 2,
        point_depart: "Toulouse",
        point_arriver: "Montpellier"
    },
    {
        type_colis: "Colis de meubles",
        montant_collecter: 50.0,
        tel_destinataire: 678901234,
        quantite: 1,
        point_depart: "Nice",
        point_arriver: "Marseille"
    },
    {
        type_colis: "Colis de fournitures",
        montant_collecter: 8.0,
        tel_destinataire: 212345678,
        quantite: 10,
        point_depart: "Lille",
        point_arriver: "Paris"
    }
];


@Component({
  selector: 'app-historique-commande',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
    FormsModule,
    MatMomentDateModule,
    MatTableModule,
    CustomersTopBarComponent,
    CustomerNavBarComponent,
    FiltreComponent
    
  ],
  templateUrl: './historique-commande.component.html',
  styleUrl: './historique-commande.component.scss'
})
export class HistoriqueCommandeComponent implements OnInit {

 est_en_attente=false;
 est_en_cours=false;
 est_livree=false;
  status= signal('');
  isSidenavOpened = true;
 
 
  constructor(
    private injector: Injector
) {

}

ngOnInit(): void {
  this.est_en_attente= true
}
  
status_effect(): void {
    
    effect(()=> {
     
      console.log("la valeur arrivee a historique : "+ this.status())
      if (this.status() === 'En attente') {
        this.est_en_attente = true
        this.est_en_cours = false
        this.est_livree = false
        
      } 
      if(this.status() === 'En cours'){
        this.est_en_attente = false
        this.est_en_cours = true
        this.est_livree = false
      }
      if(this.status() === 'Livrée') {
        this.est_en_attente = false
        this.est_en_cours = false
        this.est_livree = true
      }

     
   },{
    injector: this.injector
   })
  }

  update_status(event: any){
    this.status.update(status =>  event.value)
    this.status_effect()
  }


    
  fileName= "exelsheet.xlsx"
  exporter(): void {
        let data = document.getElementById('table-data');
        const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(data)

        const wb:XLSX.WorkBook =  XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(wb,ws,'Sheet1')

        XLSX.writeFile(wb,this.fileName)


  }
  salut():void{
    console.log("hello")
  }

  displayedColumns: string[] = [
    'column1', 
    'column2',
    'column3', 
    'column4', 
    'column5', 
    'column6', 
    'column7',];
  dataSource = ELEMENT_DATA;

  recuperation_resultat_recherche(responce : commande[]) : void{
    this.dataSource = responce;
}

recuperation_resultat_status(responce : String) : void{
  this.status.update(status => String(responce));
  
  this.status_effect()
}



toggleSidenav() {
  this.isSidenavOpened = !this.isSidenavOpened;
  console.log(this.isSidenavOpened)
}
}
