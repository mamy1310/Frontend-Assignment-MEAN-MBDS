import { Injectable } from '@angular/core';
import {Matiere} from '../assignments/matiere.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  matieres: Matiere[];

  constructor(private http: HttpClient) { }

  // uri = 'http://localhost:8010/api/matieres';
  uri = 'https://backend-assignment-mbds-mean.herokuapp.com/api/matieres';

  getMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.uri);
  }
}
