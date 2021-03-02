import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  // good practice to define the type of data you're working with.
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  // ================================================================================
  //
  //                UDEMY AUTHENTICATION CASES WITH FIREBASE
  //
  // ================================================================================
  //
  //
  // user = new Subject<User>();
  // user = new BehaviorSubject<User>(null);
  // private tokenExpirationTimer: any;
  //
  // constructor(private http: HttpClient,
  //             private router: Router) {
  // }
  //
  //
  // signup(email: string, password: string) {
  //   // send a request to the signup URL
  //   // using <AuthResponseData> in order to specify with which kind of data we are working with when we'll get our response.
  //   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvvCUg_qtwG-2RoNmVDK_kDvdfVBisWWY',
  //     {
  //       email: email,
  //       password: password,
  //       returnSecureToken: true
  //     }
  //   ).pipe(
  //     catchError(this.handleError),
  //     tap(resData => {
  //       this.handlAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
  //     })
  //   );
  // }
  //
  // login(email: string, password: string) {
  //   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyAvvCUg_qtwG-2RoNmVDK_kDvdfVBisWWY',
  //     {
  //       email: email,
  //       password: password,
  //       returnSecureToken: true
  //     }
  //   ).pipe(
  //     catchError(this.handleError),
  //     tap(resData => {
  //       this.handlAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
  //     })
  //   )
  // }
  //
  // autoLogin() {
  //   const userData: {
  //     email: string;
  //     id: string;
  //     _token: string;
  //     _tokenExpirationDate: string
  //   } = JSON.parse(localStorage.getItem('userData'));
  //   if(!userData) {
  //     return;
  //   }
  //   const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
  //
  //   // does the user have a valid token? loadedUser.token is only true because of our getter in User.model.ts
  //   if(loadedUser.token) {
  //     this.user.next(loadedUser);
  //     const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
  //     this.autoLogout(expirationDuration);
  //   }
  // }
  //
  // logout() {
  //   this.user.next(null);
  //   this.router.navigate(['/auth']);
  //   localStorage.removeItem('userData');
  //   if(this.tokenExpirationTimer) {
  //     clearTimeout(this.tokenExpirationTimer);
  //   }
  //   this.tokenExpirationTimer = null;
  // }
  //
  // // need to call our method in login authentication
  // autoLogout(expirationDuration: number) {
  //   this.tokenExpirationTimer = setTimeout(() => {
  //     this.logout();
  //   }, expirationDuration);
  // }
  //
  // private handlAuth(email: string, userId: string, token: string, expiresIn: number) {
  //   // generate a token with the token in millisecond
  //   const expirationDate = new Date(
  //     new Date().getTime() + +expiresIn * 1000);
  //   // take the data from the form
  //   const user = new User(
  //     email,
  //     userId,
  //     token,
  //     expirationDate
  //   );
  //   this.user.next(user);
  //   this.autoLogout(expiresIn * 1000);
  //   localStorage.setItem('userData', JSON.stringify(user));
  // }
  //
  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMessage = 'An unknown Error occurred!';
  //   if (!errorRes.error || errorRes.error.error) {
  //     return throwError(errorMessage);
  //   }
  //   switch (errorRes.error.error.message) {
  //     case 'EMAIL_NOT_FOUND':
  //       errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
  //       break;
  //     case 'INVALID_PASSWORD':
  //       errorMessage = ' The password is invalid or the user does not have a password.';
  //       break;
  //   }
  //   return throwError(errorMessage);
  // }
  //
  // ================================================================================
  //
  //                OUR STEP BY STEP AUTHENTICATION WITH BACKEND
  //
  // ================================================================================
  //
  //
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public email: String;
  public password: String;
  username: String;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  authenticationService(email: String, password: String) {
    return this.http.get('http://localhost:8080/auth',
      {headers: {
        authorization: this.createBasicAuthToken(email,password)
        }})
      .pipe(map((resData) => {
        console.log(email + " " + password);
        this.email = email;
        this.password = password;
        this.regiterSuccessfullLogin(email, password);
      }))
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.email = null;
    this.password = null;
    this.router.navigate(['/auth']);
  }

  isUserLoggidIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return false;
    return  true;
  }

  getLoggedInEmail() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return '';
    return user;
  }

  private createBasicAuthToken(email: String, password: String) {
    return 'Basic' + window.btoa(email + ":" + password);
  }


  private regiterSuccessfullLogin(email, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, email);
  }

  // getUsername(email) {
  //   let splittedEmail = email.split("@");
  //   this.username = splittedEmail[0];
  //   return this.username;
  // }
}
