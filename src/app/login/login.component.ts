import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { User } from './user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  error_message = '';
  username = '';
  password = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onSubmit(event) {
    const user = new User();
    user.email = this.username;
    user.password = this.password;
    console.log(user);
    this.authService.login(user).subscribe(reponse => {
        console.log('login completed');
        console.log(reponse);
        if (reponse.auth && reponse.token ){
          console.log('Tokens  obtenu');
          this.authService.saveToken(reponse.token);
          this.router.navigate(["/home"]);
        }else{
          this.error_message = 'Email or password invalid';
        }
    }, error => {
        console.log(error);
        this.error_message = 'Email or password invalid';
    });
  }

}
