import { Routes, RouterModule } from '@angular/router';

import { ResetPassword } from "./reset-password";

const accountsRoutes: Routes = [{
  path: 'reset-password/:token',
  component: ResetPassword
}];

export const accountsRouting = RouterModule.forRoot(accountsRoutes);
