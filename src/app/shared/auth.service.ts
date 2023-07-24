import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from './types/user.interface';
import { environment } from '../../environments/environment';
import { UserRequestInterface } from './types/user.request.interface';
import { UserResponseInterface } from './types/user.response.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(user: UserInterface) {
    const userRequest: UserRequestInterface = {
      ...user,
      returnSecureToken: true
    }
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, userRequest)
      .pipe(tap(this.setToken))
  }

  private setToken(response: any) {
    if (response?.idToken && response?.expiresIn) {
      const expData = new Date(new Date().getTime() + +response.expiresIn * 1000 )
      localStorage.setItem('fb-token-exp', expData.toString())
      localStorage.setItem('fb-token', response.idToken)
    } else {
      localStorage.clear();
    }
  }

  get token() {
    const currentExpDate = localStorage.getItem('fb-token-exp');
    if (currentExpDate) {
      const expDate = new Date(currentExpDate);
      if (new Date() > expDate) {
        this.logout()
        return null;
      }

      return localStorage.getItem('fb-token')
    }

    return null;
  }

  logout() {
    this.setToken(null);
  }

  isAuthenicated() {
    return !!this.token;
  }
}
