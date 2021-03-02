import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import { exhaustMap, take} from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  // ================================================================================
  //
  //                UDEMY AUTHENTICATION CASES WITH FIREBASE
  //
  // ================================================================================
  //   this.authService.user.pipe(take(1), exhaustMap(user => {
  //     // clone our request and update it
  //     if(!user) {
  //       return next.handle(req);
  //     }
  //     const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)})
  //     return next.handle(modifiedReq);
  //   }));
  //   return next.handle(req);
  // }

    // ================================================================================
    //
    //                OUR STEP BY STEP AUTHENTICATION WITH BACKEND
    //
    // ================================================================================
    if(this.authService.isUserLoggidIn() && req.url.indexOf('auth') === -1) {
      const authReq = req.clone(
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Basic ${window.btoa(this.authService.username + ':' + this.authService.password)}`
          })
        }
      );
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
