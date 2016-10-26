import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginButtons } from './login-buttons';
export var AccountsModule = (function () {
    function AccountsModule() {
    }
    AccountsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule
            ],
            declarations: [
                LoginButtons
            ],
            exports: [
                LoginButtons
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AccountsModule);
    return AccountsModule;
}());
