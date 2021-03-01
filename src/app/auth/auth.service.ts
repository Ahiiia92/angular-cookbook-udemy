import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";
import {User} from "./user.model";

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
  user = new Subject<User>();
  constructor(private http: HttpClient) {
  }
  signup(email: string, password: string) {
    // send a request to the signup URL
    // AIzaSyAvvCUg_qtwG-2RoNmVDK_kDvdfVBisWWY
    // using <AuthResponseData> in order to specify with which kind of data we are working with when we'll get our response.
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvvCUg_qtwG-2RoNmVDK_kDvdfVBisWWY',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handlAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      })
    );
  }
  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyAvvCUg_qtwG-2RoNmVDK_kDvdfVBisWWY',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handlAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      })
    )
  }

  private handlAuth(email: string, userId: string, token: string, expiresIn: number) {
    // generate a token with the token in millisecond
    const expirationDate = new Date(
      new Date().getTime() + +expiresIn * 1000);
    // take the data from the form
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
      let errorMessage = 'An unknow Error occurred!';
      if (!errorRes.error || errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = ' The password is invalid or the user does not have a password.';
          break;
      }
      return throwError(errorMessage);
  }
}
