import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { HistoriqueCommandeComponent } from '../customers/historique-commande/historique-commande.component';
import { MessagerieComponent } from '../messagerie/messagerie.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
     TranslateModule,
     FooterComponent,
     HeaderComponent,
     RouterLink,
     HistoriqueCommandeComponent,
     MessagerieComponent
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private translateService: TranslateService) {}

  public selectLanguage(event: Event) {
    const lang = (event.currentTarget as HTMLButtonElement).value;
    console.log(lang);
    this.translateService.use(lang);
  }
}
