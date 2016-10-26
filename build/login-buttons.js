"use strict";
var core_1 = require('@angular/core');
var accounts_base_1 = require('meteor/accounts-base');
var tracker_1 = require('meteor/tracker');
var meteor_1 = require('meteor/meteor');
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
            styles: [
                "\n      .login-buttons {\n        position: relative;\n        display: inline-block;\n      }\n      .login-buttons .dropdown-toggle span {\n        cursor: pointer;\n      }\n      .login-buttons .accounts-close {\n        position: absolute;\n        top: 0;\n        right: 5px;\n        cursor: pointer;\n        font-weight: bold;\n        line-height: 20px;\n        text-decoration: underline;\n        opacity: 0.8;\n      }\n      .login-buttons .accounts-close:hover {\n        opacity: 1;\n      }\n      .login-buttons .content-container {\n        position: absolute;\n        top: 0;\n        left: 0;\n        border: 1px solid #ccc;\n        z-index: 1000;\n        background: white;\n        border-radius: 4px;\n        padding: 8px 12px;\n        margin: -8px -12px 0 -12px;\n        width: 250px;\n        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);\n        -webkit-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);\n        font-size: 16px;\n        color: #333;\n      }\n      .login-buttons .content-container > * {\n        line-height: 1.6;\n      }\n      .login-buttons .content-container > .login-close-text {\n        line-height: inherit;\n        font-size: inherit;\n        font-family: inherit;\n      }\n      .login-buttons .content-container label,\n      .login-buttons .content-container .title {\n        font-size: 80%;\n        margin-top: 7px;\n        margin-bottom: -2px;\n      }\n      .login-buttons .content-container label {\n        display: inline;\n      }\n      .login-buttons .content-container input[type=text],\n      .login-buttons .content-container input[type=email],\n      .login-buttons .content-container input[type=password] {\n        -webkit-box-sizing: border-box;\n        -moz-box-sizing: border-box;\n        box-sizing: border-box;\n        width: 100%;\n      }\n      .login-buttons .content-container input[type=text][type],\n      .login-buttons .content-container input[type=email][type],\n      .login-buttons .content-container input[type=password][type] {\n        height: auto;\n      }\n      .login-buttons .loading {\n        line-height: 1;\n        background-image: url(data:image/gif;base64,R0lGODlhEAALAPQAAP///wAAANra2tDQ0Orq6gYGBgAAAC4uLoKCgmBgYLq6uiIiIkpKSoqKimRkZL6+viYmJgQEBE5OTubm5tjY2PT09Dg4ONzc3PLy8ra2tqCgoMrKyu7u7gAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA);\n        width: 16px;\n        background-position: center center;\n        background-repeat: no-repeat;\n      }"],
            template: "\n      <div class=\"login-buttons\">\n        <div class=\"dropdown-toggle\" [hidden]=\"isDropdownOpen\" (click)=\"isDropdownOpen=true\">\n          <span *ngIf=\"isLoggedIn\">\n            {{ displayName() }} \u25BE\n          </span>\n          <span *ngIf=\"!isLoggedIn\">\n            Login \u25BE\n          </span>\n        </div>\n        <div class=\"content-container\" [hidden]=\"!isDropdownOpen\">\n          <div class=\"accounts-close\" (click)=\"isDropdownOpen=false\">Close</div>\n          <div *ngIf=\"isLoggedIn\">\n            <div class=\"login-text-and-button\">\n              <div class=\"login-display-name\">\n                {{ displayName() }}\n              </div>\n              <a class=\"login-buttons-logout\" (click)=\"logout()\">Sign Out</a>\n            </div>\n          </div>\n          <div *ngIf=\"!isLoggedIn\">\n            <span [hidden]=\"!isLoggingIn\">Please wait...</span>\n            <form class=\"login-buttons-login-form\" [hidden]=\"isLoggingIn\">\n              <div *ngIf=\"message == ''\">\n      \n                <label for=\"email\">Email</label>\n                <input class=\"login-buttons-email-input form-control\" type=\"email\" name= \"email\" required [(ngModel)]=\"credentials.email\"/>\n                <div [hidden]=\"isPasswordRecovery\">\n                  <label for=\"password\">Password</label>\n                  <input class=\"login-buttons-password-input form-control\" type=\"password\" name=\"password\" required\n                         [(ngModel)]=\"credentials.password\"/>\n                </div>\n              </div>\n              <br/>\n              <ul [hidden]=\"!errors || errors.length == 0\">\n                <li *ngFor=\"let error of errors\">\n                  {{ error }}\n                </li>\n              </ul>\n              {{ message }}\n              <div *ngIf=\"message == ''\">\n                <button *ngIf=\"!isPasswordRecovery && !isSignup\" class=\"login-button-login\" (click)=\"login()\">Login</button>\n                <button *ngIf=\"!isPasswordRecovery && isSignup\" class=\"login-button-signup\" (click)=\"signup()\">Signup\n                </button>\n                <!--<button *ngIf=\"isPasswordRecovery && !isSignup\" class=\"login-button-recover\" (click)=\"recover()\">Recover-->\n                <!--</button>-->\n              </div>\n              <br/>\n              <a [hidden]=\"isSignup\" class=\"signup-button\" (click)=\"isSignup=true; isPasswordRecovery=false; resetErrors();\">Signup</a>\n              <!--<a [hidden]=\"isPasswordRecovery\" class=\"recover-button\"-->\n              <!--(click)=\"isPasswordRecovery=true; isSignup=false; resetErrors();\" href=\"#\">Recover Password</a>-->\n              <a [hidden]=\"!isSignup && !isPasswordRecovery\" class=\"login-button\"\n                 (click)=\"isPasswordRecovery=false; isSignup=false; resetErrors();\">Back to Login</a>\n            </form>\n          </div>\n        </div>\n      </div>"
        }), 
        __metadata('design:paramtypes', [core_1.NgZone])
    ], LoginButtons);
    return LoginButtons;
}());
exports.LoginButtons = LoginButtons;
