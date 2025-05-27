import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthModel } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { Utils } from './utils';
import { environment } from '../../../environments/environment.prod';
import { ApiResponseModel } from '../models/api.response.model';
import { RegisterForm } from '../forms/register.form';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private host = environment.apiUrl;

  private loginPath = this.host + '/auth/login';
  private registerPath = this.host + '/auth/register';

  constructor(private httpClient: HttpClient) {}

  public login(data: {
    email: string;
    password: string;
  }): Observable<ApiResponseModel<AuthModel>> {
    return this.httpClient.post<ApiResponseModel<AuthModel>>(
      `${this.loginPath}`,
      data,
      { headers: Utils.buildHeader() },
    );
  }

  public register(data: RegisterForm): Observable<ApiResponseModel<AuthModel>> {
    return this.httpClient.post<ApiResponseModel<AuthModel>>(
      `${this.registerPath}`,
      data,
      { headers: Utils.buildHeader() },
    );
  }
}
