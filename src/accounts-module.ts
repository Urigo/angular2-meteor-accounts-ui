import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LoginButtons} from './login-buttons';
import {AuthGuard} from "./annotations";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoginButtons
  ],
  providers: [
    AuthGuard
  ],
  exports: [
    LoginButtons
  ]
})
export class AccountsModule {
}
