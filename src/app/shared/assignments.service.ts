import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Assignment} from '../assignments/assignment.model';
import {LoggingService} from './logging.service';
import {assignmentsGeneres} from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments: Assignment[];

  constructor(private loggingService: LoggingService, private http: HttpClient) { }

   // uri = 'http://localhost:8010/api/assignments';
  uri = 'https://backend-assignment-mbds-mean.herokuapp.com/api/assignments';

  getAssignments(): Observable<Assignment[]> {
    console.log('Dans le service de gestion des assignments...');
    // return of(this.assignments);
    return this.http.get<Assignment[]>(this.uri);
  }

  getAssignmentsPagine(page: number, limit: number, rendu,searchQuery): Observable<any> {
    const query = '?page=' + page + '&limit=' + limit + '&rendu=' + rendu + '&search=' + searchQuery;
    return this.http.get<Assignment[]>(this.uri + query);
  }

  // Pour votre culture, on peut aussi utiliser httpClient avec une promesse
  // et then, async, await etc. Mais ce n'est pas la norme chez les developpeurs
  // Angular
  getAssignmentsAsPromise(): Promise<Assignment[]> {
    console.log('Dans le service de gestion des assignments...');
    // return of(this.assignments);
    return this.http.get<Assignment[]>(this.uri).toPromise();
  }

  getAssignment(id: number): Observable<Assignment> {
    // let assignementCherche = this.assignments.find(a => a.id === id);

    // return of(assignementCherche);

    return this.http.get<Assignment>(this.uri + '/' + id)
    .pipe(
      // traitement 1
      map(a => {
       // a.nom += ' MODIFIE PAR MAP';
        return a;
      }),
      tap(a => {
        console.log('TRACE DANS TAP : j\'ai reçu ' + a.nom);
      }),
      /*
      filter(a => {
        return (a.rendu)
      })
      */
      catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
    );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  generateId(): number {
    return Math.round(Math.random() * 100000);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    assignment.id = this.generateId();
    // this.loggingService.log(assignment.nom, " a été ajouté");

    /*this.assignments.push(assignment);


    return of("Service: assignment ajouté !");*/

    return this.http.post(this.uri, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    // besoin de ne rien faire puisque l'assignment passé en paramètre
    // est déjà un élément du tableau

    // let index = this.assignments.indexOf(assignment);

    // console.log("updateAssignment l'assignment passé en param est à la position " + index + " du tableau");
    this.loggingService.log(assignment.nom, ' a été modifié');

    return this.http.put(this.uri, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    /*
    let index = this.assignments.indexOf(assignment);

    this.assignments.splice(index, 1);
    */


    this.loggingService.log(assignment.nom, ' a été supprimé');

    return this.http.delete(this.uri + '/' + assignment._id);

  }

  peuplerBD(): void {
    assignmentsGeneres.forEach(a => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.id = a.id;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      this.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);
      });
    });
  }

  // autre version qui permet de récupérer un subscribe une fois que tous les inserts
  // ont été effectués
  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment = [];
    console.log('Peuplement bd');
    assignmentsGeneres.forEach((a) => {
      const nouvelAssignment = new Assignment();

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.remarque = '';
      const listeProfs = [
        {nom: 'Buffa', image: 'buffa.jpg'},
        {nom: 'Grin', image: 'grin.jpg'},
        {nom: 'Pasquier', image: 'pasquier.jpg'},
        {nom: 'Miranda', image: 'miranda.jpg'},
        {nom: 'Mopolo', image: 'mopolo.jpg'}
      ];
      const matieres = [
        {nom: 'MEAN', image: 'mean.svg'},
        {nom: 'JEE', image: 'jee.png'},
        {nom: 'R', image: 'r.png'},
        {nom: 'Big data', image: 'big_data.png'},
        {nom: 'Oracle', image: 'oracle.png'}
      ];
      const random = Math.floor(Math.random() * 5);
      nouvelAssignment.matiere = {
        nom: matieres[random].nom,
        image: matieres[random].image,
        nom_prof: listeProfs[random].nom,
        image_prof: listeProfs[random].image
      };
      nouvelAssignment.note = a.rendu ? Math.floor(Math.random() * 20) : null;
      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment);
  }
}
