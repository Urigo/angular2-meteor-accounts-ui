import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginButtons } from './login-buttons';

@NgModule({
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
})
export class AccountsModule {}
