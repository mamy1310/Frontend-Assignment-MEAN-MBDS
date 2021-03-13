import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { User } from '../login/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  admin: User = null;

  constructor(private http: HttpClient) {}

   uri = 'http://localhost:8010/api/';
  // uri = 'https://backend-assignment-mbds-mean.herokuapp.com/api/';
  login(user: User): Observable<any> {
    // this.loggingService.log(assignment.nom, " a été ajouté");

    /*this.assignments.push(assignment);


    return of("Service: assignment ajouté !");*/

    return this.http.post(this.uri + 'login', user);
  }

  getUserByToken(): Observable<any> {
    // this.loggingService.log(assignment.nom, " a été ajouté");

    /*this.assignments.push(assignment);


    return of("Service: assignment ajouté !");*/
    const token: string = localStorage.getItem('access_token');
    console.log( 'token: ' + token);
    return this.http.get(this.uri + 'auth', { headers: { 'x-access-token': token, 'Accept' : '*/*'}});
  }

  // tslint:disable-next-line:typedef
  saveToken(token){
    localStorage.setItem('access_token', token);
  }

  // tslint:disable-next-line:typedef
  logOut() {
    this.loggedIn = false;
    this.admin = null;
    localStorage.removeItem('access_token');
  }

  // tslint:disable-next-line:typedef
  isAdmin() {
    return this.admin != null;
  }
  // tslint:disable-next-line:typedef
  hasToken() {
    return new Promise((resolve, reject) => {
      resolve(localStorage.getItem('access_token'));
    });
  }
}
