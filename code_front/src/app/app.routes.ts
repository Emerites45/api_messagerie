import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/admins/admin.routes').then((mod) => mod.ADMIN_ROUTES),
    canActivate: [authGuard],
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./pages/customers/customer.routes').then(
        (mod) => mod.CUSTOMER_ROUTES,
      ),
  //  canActivate: [authGuard],
  },
  { path: '**', component: NotFoundComponent },
];
