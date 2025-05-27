import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatToolbarModule} from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { EnvoyerCommandeComponent } from '../envoyer-commande/envoyer-commande.component';
import { HistoriqueCommandeComponent } from '../historique-commande/historique-commande.component';
import { UpdateCommandComponent } from '../update-command/update-command.component';
import { SessionService } from '../../../core/services/session.service';

@Component({
  selector: 'app-customer-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatGridListModule,
    MatMenuModule,
    UpdateUserComponent,
    EnvoyerCommandeComponent,
    HistoriqueCommandeComponent,
    UpdateCommandComponent,
    RouterLink

  ],
  templateUrl: './customer-home.component.html',
  styleUrl: './customer-home.component.scss',
})
export class CustomerHomeComponent implements OnInit {
  constructor(
    private router: Router,
    private sessionService: SessionService,
  ) {}

  ngOnInit(): void {
    console.log(this.sessionService.user);
  }

 
}
