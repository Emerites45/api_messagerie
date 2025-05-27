
import { SessionService } from '../../../core/services/session.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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


@Component({
  selector: 'app-customers-top-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    UpdateUserComponent,
    RouterLink
  ],
  templateUrl: './customers-top-bar.component.html',
  styleUrl: './customers-top-bar.component.scss'
})
export class CustomersTopBarComponent {

  @Output() sidenavToggle = new EventEmitter<void>();
  constructor(
    private router: Router,
    private sessionService: SessionService,
  ) {}
  
  toggleSidenav() {
    this.sidenavToggle.emit();
  }

  
  logOut() {
    this.sessionService.logOut();
    this.router.navigate(['']);
  }
}
