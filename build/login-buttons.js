"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var accounts_base_1 = require('meteor/accounts-base');
var tracker_1 = require('meteor/tracker');
var meteor_1 = require('meteor/meteor');
var LOGIN_TEMPLATE = "<div class=\"login-buttons\">  <div class=\"dropdown-toggle\" [hidden]=\"isDropdownOpen\" (click)=\"isDropdownOpen=true\">    <span *ngIf=\"isLoggedIn\">      {{ displayName() }} ▾    </span>    <span *ngIf=\"!isLoggedIn\">      Login ▾    </span>  </div>  <div class=\"content-container\" [hidden]=\"!isDropdownOpen\">    <div class=\"accounts-close\" (click)=\"isDropdownOpen=false\">Close</div>    <div *ngIf=\"isLoggedIn\">      <div class=\"login-text-and-button\">        <div class=\"login-display-name\">          {{ displayName() }}        </div>        <a class=\"login-buttons-logout\" (click)=\"logout()\" href=\"#\">Sign Out</a>      </div>    </div>    <div *ngIf=\"!isLoggedIn\">      <span [hidden]=\"!isLoggingIn\">Please wait...</span>      <form class=\"login-buttons-login-form\" [hidden]=\"isLoggingIn\">        <div *ngIf=\"message == ''\">          <label for=\"email\">Email</label>          <input class=\"login-buttons-email-input form-control\" type=\"email\" required [(ngModel)]=\"credentials.email\"/>          <div [hidden]=\"isPasswordRecovery\">            <label for=\"password\">Password</label>            <input class=\"login-buttons-password-input form-control\" type=\"password\" required                   [(ngModel)]=\"credentials.password\"/>          </div>        </div>        <br/>        <ul [hidden]=\"!errors || errors.length == 0\">          <li *ngFor=\"let error of errors\">            {{ error }}          </li>        </ul>        {{ message }}        <div *ngIf=\"message == ''\">          <button *ngIf=\"!isPasswordRecovery && !isSignup\" class=\"login-button-login\" (click)=\"login()\">Login</button>          <button *ngIf=\"!isPasswordRecovery && isSignup\" class=\"login-button-signup\" (click)=\"signup()\">Signup          </button>          <!--<button *ngIf=\"isPasswordRecovery && !isSignup\" class=\"login-button-recover\" (click)=\"recover()\">Recover-->          <!--</button>-->        </div>        <br/>        <a [hidden]=\"isSignup\" class=\"signup-button\" (click)=\"isSignup=true; isPasswordRecovery=false; resetErrors();\"           href=\"#\">Signup</a>        <!--<a [hidden]=\"isPasswordRecovery\" class=\"recover-button\"-->        <!--(click)=\"isPasswordRecovery=true; isSignup=false; resetErrors();\" href=\"#\">Recover Password</a>-->        <a [hidden]=\"!isSignup && !isPasswordRecovery\" class=\"login-button\"           (click)=\"isPasswordRecovery=false; isSignup=false; resetErrors();\" href=\"#\">Back to Login</a>      </form>    </div>  </div></div>";
var LoginButtons = (function () {
    function LoginButtons(zone) {
        this.zone = zone;
        this._initAutorun();
        this.services = this._getLoginServices();
        this.resetErrors();
        this.isPasswordRecovery = false;
        this.isSignup = false;
        this.isDropdownOpen = false;
        this._resetCredentialsFields();
    }
    LoginButtons.prototype._resetCredentialsFields = function () {
        this.credentials = { email: '', password: '' };
    };
    LoginButtons.prototype.resetErrors = function () {
        this.errors = [];
        this.message = "";
    };
    LoginButtons.prototype.singleService = function () {
        var services = this._getLoginServices();
        return services[0];
    };
    LoginButtons.prototype.displayName = function () {
        var user = this.currentUser;
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
    ;
    LoginButtons.prototype.login = function () {
        var _this = this;
        this.resetErrors();
        var email = this.credentials.email;
        var password = this.credentials.password;
        meteor_1.Meteor.loginWithPassword(email, password, function (error) {
            if (error) {
                _this.errors.push(error.reason || "Unknown error");
            }
            else {
                _this.isDropdownOpen = false;
                _this._resetCredentialsFields();
            }
        });
    };
    LoginButtons.prototype.recover = function () {
        var _this = this;
        this.resetErrors();
        accounts_base_1.Accounts.forgotPassword({ email: this.credentials.email }, function (error) {
            if (error) {
                _this.errors.push(error.reason || "Unknown error");
            }
            else {
                _this.message = "You will receive further instruction to you email address!";
                _this.isDropdownOpen = false;
                _this._resetCredentialsFields();
            }
        });
    };
    LoginButtons.prototype.logout = function () {
        meteor_1.Meteor.logout();
        this.isDropdownOpen = false;
    };
    LoginButtons.prototype.signup = function () {
        var _this = this;
        this.resetErrors();
        accounts_base_1.Accounts.createUser(this.credentials, function (error) {
            if (error) {
                _this.errors.push(error.reason || "Unknown error");
            }
            else {
                _this.isDropdownOpen = false;
                _this._resetCredentialsFields();
            }
        });
    };
    LoginButtons.prototype._hasPasswordService = function () {
        return !!Package['accounts-password'];
    };
    LoginButtons.prototype._getLoginServices = function () {
        var services = Package['accounts-oauth'] ? accounts_base_1.Accounts.oauth.serviceNames() : [];
        services.sort();
        if (this._hasPasswordService())
            services.push('password');
        return _.map(services, function (name) {
            return { name: name };
        });
    };
    LoginButtons.prototype.dropdown = function () {
        return this._hasPasswordService() || this._getLoginServices().length > 1;
    };
    LoginButtons.prototype._initAutorun = function () {
        var _this = this;
        this.autorunComputation = tracker_1.Tracker.autorun(function () {
            _this.zone.run(function () {
                _this.currentUser = meteor_1.Meteor.user();
                _this.currentUserId = meteor_1.Meteor.userId();
                _this.isLoggingIn = meteor_1.Meteor.loggingIn();
                _this.isLoggedIn = !!meteor_1.Meteor.user();
            });
        });
    };
    LoginButtons = __decorate([
        core_1.Component({
            selector: 'login-buttons',
            moduleId: meteor_1.Meteor.absoluteUrl(module.id),
            template: LOGIN_TEMPLATE,
            directives: [common_1.NgIf, common_1.NgFor]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _a) || Object])
    ], LoginButtons);
    return LoginButtons;
    var _a;
}());
exports.LoginButtons = LoginButtons;
