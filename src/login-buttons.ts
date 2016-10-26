import { Component, NgZone } from '@angular/core'; 
import { Accounts } from 'meteor/accounts-base';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

declare var Package;
declare var _;

export interface LoginCredentials {
  email: string;
  password: string;
}

@Component({
  selector: 'login-buttons',
  styles: [
    `
      .login-buttons {
        position: relative;
        display: inline-block;
      }
      .login-buttons .dropdown-toggle span {
        cursor: pointer;
      }
      .login-buttons .accounts-close {
        position: absolute;
        top: 0;
        right: 5px;
        cursor: pointer;
        font-weight: bold;
        line-height: 20px;
        text-decoration: underline;
        opacity: 0.8;
      }
      .login-buttons .accounts-close:hover {
        opacity: 1;
      }
      .login-buttons .content-container {
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid #ccc;
        z-index: 1000;
        background: white;
        border-radius: 4px;
        padding: 8px 12px;
        margin: -8px -12px 0 -12px;
        width: 250px;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);
        -webkit-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);
        font-size: 16px;
        color: #333;
      }
      .login-buttons .content-container > * {
        line-height: 1.6;
      }
      .login-buttons .content-container > .login-close-text {
        line-height: inherit;
        font-size: inherit;
        font-family: inherit;
      }
      .login-buttons .content-container label,
      .login-buttons .content-container .title {
        font-size: 80%;
        margin-top: 7px;
        margin-bottom: -2px;
      }
      .login-buttons .content-container label {
        display: inline;
      }
      .login-buttons .content-container input[type=text],
      .login-buttons .content-container input[type=email],
      .login-buttons .content-container input[type=password] {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
      }
      .login-buttons .content-container input[type=text][type],
      .login-buttons .content-container input[type=email][type],
      .login-buttons .content-container input[type=password][type] {
        height: auto;
      }
      .login-buttons .loading {
        line-height: 1;
        background-image: url(data:image/gif;base64,R0lGODlhEAALAPQAAP///wAAANra2tDQ0Orq6gYGBgAAAC4uLoKCgmBgYLq6uiIiIkpKSoqKimRkZL6+viYmJgQEBE5OTubm5tjY2PT09Dg4ONzc3PLy8ra2tqCgoMrKyu7u7gAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA);
        width: 16px;
        background-position: center center;
        background-repeat: no-repeat;
      }`],
  template: `
      <div class="login-buttons">
        <div class="dropdown-toggle" [hidden]="isDropdownOpen" (click)="isDropdownOpen=true">
          <span *ngIf="isLoggedIn">
            {{ displayName() }} ▾
          </span>
          <span *ngIf="!isLoggedIn">
            Login ▾
          </span>
        </div>
        <div class="content-container" [hidden]="!isDropdownOpen">
          <div class="accounts-close" (click)="isDropdownOpen=false">Close</div>
          <div *ngIf="isLoggedIn">
            <div class="login-text-and-button">
              <div class="login-display-name">
                {{ displayName() }}
              </div>
              <a class="login-buttons-logout" (click)="logout()">Sign Out</a>
            </div>
          </div>
          <div *ngIf="!isLoggedIn">
            <span [hidden]="!isLoggingIn">Please wait...</span>
            <form class="login-buttons-login-form" [hidden]="isLoggingIn">
              <div *ngIf="message == ''">
      
                <label for="email">Email</label>
                <input class="login-buttons-email-input form-control" type="email" name= "email" required [(ngModel)]="credentials.email"/>
                <div [hidden]="isPasswordRecovery">
                  <label for="password">Password</label>
                  <input class="login-buttons-password-input form-control" type="password" name="password" required
                         [(ngModel)]="credentials.password"/>
                </div>
              </div>
              <br/>
              <ul [hidden]="!errors || errors.length == 0">
                <li *ngFor="let error of errors">
                  {{ error }}
                </li>
              </ul>
              {{ message }}
              <div *ngIf="message == ''">
                <button *ngIf="!isPasswordRecovery && !isSignup" class="login-button-login" (click)="login()">Login</button>
                <button *ngIf="!isPasswordRecovery && isSignup" class="login-button-signup" (click)="signup()">Signup
                </button>
                <!--<button *ngIf="isPasswordRecovery && !isSignup" class="login-button-recover" (click)="recover()">Recover-->
                <!--</button>-->
              </div>
              <br/>
              <a [hidden]="isSignup" class="signup-button" (click)="isSignup=true; isPasswordRecovery=false; resetErrors();">Signup</a>
              <!--<a [hidden]="isPasswordRecovery" class="recover-button"-->
              <!--(click)="isPasswordRecovery=true; isSignup=false; resetErrors();" href="#">Recover Password</a>-->
              <a [hidden]="!isSignup && !isPasswordRecovery" class="login-button"
                 (click)="isPasswordRecovery=false; isSignup=false; resetErrors();">Back to Login</a>
            </form>
          </div>
        </div>
      </div>`
})
export class LoginButtons {
  autorunComputation: Tracker.Computation;
  currentUser: Meteor.User;
  currentUserId: string;
  isLoggingIn: boolean;
  isLoggedIn: boolean;
  services: Array<any>;
  credentials: LoginCredentials;
  errors: Array<string>;
  isPasswordRecovery: boolean;
  isSignup: boolean;
  isDropdownOpen: boolean;
  message: string;

  constructor(private zone: NgZone) {
    this._initAutorun();
    this.services = this._getLoginServices();
    this.resetErrors();
    this.isPasswordRecovery = false;
    this.isSignup = false;
    this.isDropdownOpen = false;
    this._resetCredentialsFields();
  }

  _resetCredentialsFields() {
    this.credentials = { email: '', password: '' };
  }

  resetErrors() {
    this.errors = [];
    this.message = "";
  }

  singleService(): Object {
    let services = this._getLoginServices();

    return services[0];
  }

  displayName(): string {
    let user : any = this.currentUser;

    if (!user)
      return '';

    if (user.profile && user.profile.name)
      return user.profile.name;

    if (user.username)
      return user.username;

    if (user.emails && user.emails[0] && user.emails[0].address)
      return user.emails[0].address;

    return '';
  };

  login(): void {
    this.resetErrors();

    let email: string = this.credentials.email;
    let password: string = this.credentials.password;

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        this.errors.push(error.reason || "Unknown error");
      }
      else {
        this.isDropdownOpen = false;
        this._resetCredentialsFields();
      }
    });
  }

  recover() {
    this.resetErrors();

    Accounts.forgotPassword({ email: this.credentials.email }, (error) => {
      if (error) {
        this.errors.push(error.reason || "Unknown error");
      }
      else {
        this.message = "You will receive further instruction to you email address!";
        this.isDropdownOpen = false;
        this._resetCredentialsFields();
      }
    });
  }

  logout(): void {
    Meteor.logout();
    this.isDropdownOpen = false;
  }

  signup(): void {
    this.resetErrors();

    Accounts.createUser(this.credentials, (error) => {
      if (error) {
        this.errors.push(error.reason || "Unknown error");
      }
      else {
        this.isDropdownOpen = false;
        this._resetCredentialsFields();
      }
    });
  }

  _hasPasswordService(): boolean {
    return !!Package['accounts-password'];
  }

  _getLoginServices(): Array<any> {
    let services = Package['accounts-oauth'] ? Accounts.oauth.serviceNames() : [];
    services.sort();

    if (this._hasPasswordService())
      services.push('password');

    return _.map(services, function(name) {
      return { name: name };
    });
  }

  dropdown(): boolean {
    return this._hasPasswordService() || this._getLoginServices().length > 1;
  }

  _initAutorun(): void {
    this.autorunComputation = Tracker.autorun(() => {
      this.zone.run(() => {
        this.currentUser = Meteor.user();
        this.currentUserId = Meteor.userId();
        this.isLoggingIn = Meteor.loggingIn();
        this.isLoggedIn = !!Meteor.user();
      })
    });
  }
}
