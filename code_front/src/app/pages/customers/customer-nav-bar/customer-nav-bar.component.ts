import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-nav-bar',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatSelectModule,
    MatSidenavModule,
  
    RouterLink,
    
  ],
  templateUrl: './customer-nav-bar.component.html',
  styleUrl: './customer-nav-bar.component.scss'
})
export class CustomerNavBarComponent {

}
