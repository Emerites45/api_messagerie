import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public isLogged: boolean = false;
  public token: string = '';
  public user: UserModel | undefined;

  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  public $isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  public logIn(auth: AuthModel): void {
    this.token = auth.token;
    this.user = auth.user;
    this.isLogged = true;
    this.next();
  }

  public logOut(): void {
    this.token = '';
    this.user = undefined;
    this.isLogged = false;
    this.next();
  }

  private next(): void {
    this.isLoggedSubject.next(this.isLogged);
  }
}
