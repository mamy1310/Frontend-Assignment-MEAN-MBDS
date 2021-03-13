import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loading = false;
  title = 'Application de gestion des assignments';

  constructor(private authService: AuthService,
              private router: Router,
              private assignmentsService: AssignmentsService,
              private spinner: NgxSpinnerService
  ) {}

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

  peuplerBD(): void {
    // version naive et simple
    // this.assignmentsService.peuplerBD();

    // meilleure version :
    this.spinner.show();
    this.assignmentsService.peuplerBDAvecForkJoin()
      .subscribe(() => {
        console.log('LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE');
        this.router.navigate(['/home'], {replaceUrl: true});
        this.spinner.hide();
      });
  }
}
