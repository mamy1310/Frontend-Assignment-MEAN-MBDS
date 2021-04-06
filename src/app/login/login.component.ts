import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
  isPassword = true;
  // tslint:disable-next-line:variable-name
  url_redirect = '';

  // tslint:disable-next-line:max-line-length
  constructor(private authService: AuthService, private router: Router,private spinner: NgxSpinnerService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.url_redirect = this.route.snapshot.queryParams.redirectURL;
    console.log("this.url_redirect" );
    console.log( this.route.snapshot.queryParams);
  }

  // tslint:disable-next-line:typedef
  togglePassword(){
    this.isPassword = !this.isPassword;
  }
  // tslint:disable-next-line:typedef
  onSubmit(event) {
    const user = new User();
    user.email = this.username;
    user.password = this.password;
    console.log(user);
    this.spinner.show();
    this.authService.login(user).subscribe(reponse => {
        console.log('login completed');
        console.log(reponse);
        this.spinner.hide();
        if (reponse.auth && reponse.token ){
          console.log('Tokens  obtenu');
          this.authService.saveToken(reponse.token);
          this.authService.checkUser();
          this.router.navigateByUrl(this.url_redirect);
        }else{
          this.error_message = 'Email or password invalid';
        }
    }, error => {
        this.spinner.hide();
        console.log(error);
        this.error_message = 'Email or password invalid';
    });
  }

}
