import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import {AssignmentsService} from "./shared/assignments.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion des assignments';

  constructor(private authService: AuthService, private router: Router, private assignmentsService: AssignmentsService) {}

  login(): void {
    // si je suis pas loggé, je me loggue, sinon, si je suis
    // loggé je me déloggue et j'affiche la page d'accueil

    if (this.authService.loggedIn) {
      // je suis loggé
      // et bien on se déloggue
      this.authService.logOut();
      // on navigue vers la page d'accueil
      this.router.navigate(['/home']);
    } else {
      // je ne suis pas loggé, je me loggue
      this.authService.logIn('admin', 'toto');
    }
  }

  onSubmit(): void {
    this.assignmentsService.populate().subscribe(() => {
      console.log('Importation terminée');
      this.router.navigate(['/home'], {replaceUrl: true});
    });
  }
}
