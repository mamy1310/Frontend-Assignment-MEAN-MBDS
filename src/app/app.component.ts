import {AfterViewInit, Component, OnInit} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { User } from './login/user.model';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  loading = false;
  title = 'Application de gestion des assignments';
  isLogin = false;
  isAdmin = false;
  admin: User;
  constructor(private authService: AuthService, private router: Router,
              private assignmentsService: AssignmentsService, private spinner: NgxSpinnerService) {
                router.events.forEach((event) => {
                  if (event instanceof NavigationStart) {
                      this.isLogin = event.url === '/login';
                  }
                });
    }

  ngOnInit(): void {
    this.authService.checkUser();
    this.authService.getEmitted()
      .subscribe(item => this.isAdmin = item);
  }
  ngAfterViewInit(): void {
    console.log('View init');
  }
  // tslint:disable-next-line:typedef
  login() {

      this.router.navigate(['/login']);
  }
  // tslint:disable-next-line:typedef
  logout() {
    this.authService.logOut();
    this.router.navigate(['/home']);
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
