import { Routes } from '@angular/router';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { EnvoyerCommandeComponent } from './envoyer-commande/envoyer-commande.component';
import { HistoriqueCommandeComponent } from './historique-commande/historique-commande.component';
import { UpdateCommandComponent } from './update-command/update-command.component';

export const CUSTOMER_ROUTES: Routes = [
  { path: '', component: CustomerHomeComponent },
  { path: 'update-user', component: UpdateUserComponent },
  {path: 'envoyer-commande', component: EnvoyerCommandeComponent },
  {path: 'historique-commande', component: HistoriqueCommandeComponent},
  {path: 'update-command', component: UpdateCommandComponent}



];
