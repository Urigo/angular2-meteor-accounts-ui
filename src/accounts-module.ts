import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LoginButtons} from './login-buttons';
import {ResetPassword} from './reset-password';
import {AuthGuard} from "./annotations";
import {accountsRouting} from "./routes";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    accountsRouting
  ],
  declarations: [
    LoginButtons,
    ResetPassword
  ],
  providers: [
    AuthGuard
  ],
  exports: [
    LoginButtons,
    ResetPassword
  ]
})
export class AccountsModule {}
