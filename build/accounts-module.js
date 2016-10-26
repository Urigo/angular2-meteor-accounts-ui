"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var login_buttons_1 = require('./login-buttons');
var annotations_1 = require("./annotations");
var AccountsModule = (function () {
    function AccountsModule() {
    }
    AccountsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule
            ],
            declarations: [
                login_buttons_1.LoginButtons
            ],
            providers: [
                annotations_1.AuthGuard
            ],
            exports: [
                login_buttons_1.LoginButtons
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AccountsModule);
    return AccountsModule;
}());
exports.AccountsModule = AccountsModule;
