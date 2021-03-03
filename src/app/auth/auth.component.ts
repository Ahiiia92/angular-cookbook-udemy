import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent {
  isLogginMode = true;
  isLoading = false;
  error: string = null;
  invalidLogin = false;
  loginSuccess = false;
  errorMessage = 'Invalid Credentials';
  successMessage: string;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  onSwitchMode() {
    this.isLogginMode = !this.isLogginMode;
  }

  // ================================================================================
  //
  //                UDEMY AUTHENTICATION CASES WITH FIREBASE
  //
  // ================================================================================

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLogginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signup(email, password);
    }
    authObservable.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.loginSuccess = true;
        this.successMessage = 'Login Successful!'
        // navigate to recipes
        this.router.navigate(['/recipes']);
      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.invalidLogin = true;
        this.isLoading = false;
      }
    );
    form.reset();
  }

  // ================================================================================
  //
  //                OUR STEP BY STEP AUTHENTICATION WITH BACKEND
  //
  // ================================================================================
  //
  //
  // onSubmit(form: NgForm) {
  //   if (!form.valid) {
  //     return;
  //   }
  //   const email = form.value.email;
  //   const password = form.value.password;
  //
  //   this.isLoading = true;
  //   if (this.isLogginMode) {
  //     this.authService.authenticationService(email, password).subscribe(
  //       resData => {
  //         console.log(resData);
  //         this.isLoading = false;
  //         this.loginSuccess = true;
  //         this.successMessage = 'Login Successful!'
  //         // navigate to recipes
  //         this.router.navigate(['/recipes']);
  //       }, errorMessage => {
  //         console.log(errorMessage);
  //         this.error = errorMessage;
  //         this.invalidLogin = true;
  //         this.isLoading = false;
  //       }
  //     );
  //   }
  //   form.reset();
  // }
}
