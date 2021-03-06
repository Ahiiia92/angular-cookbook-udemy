import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  show = false;
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    // ================================================================================
    //
    //                UDEMY AUTHENTICATION CASES WITH FIREBASE
    //
    // ================================================================================
    this.userSub = this.authService.user.subscribe(user => {
        // this.isAuthenticated = !user ? false : true;
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
    }
    );

    // ================================================================================
    //
    //                OUR STEP BY STEP AUTHENTICATION WITH BACKEND
    //
    // ================================================================================
    // this.isAuthenticated = this.authService.isUserLoggidIn();
    // console.log('menu => ' + this.isAuthenticated);
  }

  ngOnDestroy() {
    // ================================================================================
    //
    //                UDEMY AUTHENTICATION CASES WITH FIREBASE
    //
    // ================================================================================
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
