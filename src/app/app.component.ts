import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { User } from './login/user.model';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion des assignments';
  isLogin = false;
  admin:User;
  constructor(private authService:AuthService, private router:Router,
              private assignmentsService:AssignmentsService) {
                router.events.forEach((event) => {
                  if(event instanceof NavigationStart) {
                      this.isLogin = event.url == '/login';
                  }
                });
    }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    console.log('Check user');
    this.authService.getUserByToken().subscribe(reponse => {
      console.log(reponse);
      if (reponse.name){
         const admin = new User();
         admin.nom = reponse.name;
         this.authService.admin = admin;
         this.admin = admin;
      }
    }, error => {
      console.log(error);
      this.authService.logOut();
    });
  }
  // tslint:disable-next-line:typedef
  login() {

      this.router.navigate(["/login"]);
  }
  // tslint:disable-next-line:typedef
  logout() {
    this.authService.logOut();
    this.router.navigate(["/home"]);
  }

  peuplerBD() {
    // version naive et simple
    //this.assignmentsService.peuplerBD();

    // meilleure version :
    this.assignmentsService.peuplerBDAvecForkJoin()
      .subscribe(() => {
        console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE");
        this.router.navigate(["/home"], {replaceUrl:true});
      })
  }
  isAdmin(){
    return this.authService.isAdmin();
  }
}
