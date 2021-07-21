import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StorageService } from './storage.service';
import { ILogin } from '../models/login.model';
import { IUserLogin } from './../models/user-login.model';
import { environment } from './../../environments/environment';

const { server, api } = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router
  ) { }

  login(login: ILogin): Observable<IUserLogin> {
    // TODO: Implementar seguridad al enviar datos de usuario.
    return this.http.post<IUserLogin>(`${server}${api}/auth/login`, login);
  }

  logout(): boolean {
    this.storage.clear();
    this.router.navigate(['/login']);
    return false;
  }

  isAuth(): boolean {
    return !!(this.storage.read('_user') && this.storage.read('_token'));
  }

  userMenu(): any {
    return !!(this.storage.read('_access')) ? JSON.parse(decodeURIComponent(escape(JSON.stringify(this.storage.read('_access'))))) : [];
  }

}
