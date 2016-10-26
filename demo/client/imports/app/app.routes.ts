import {AppComponent} from "./app.component";
import {GuardedComponent} from "../guarded/guarded.component";
import {AuthGuard} from "angular2-meteor-accounts-ui";

export const APP_ROUTES = [
  { path: '', component: AppComponent},
  { path: 'guarded', component: GuardedComponent, canActivate: [AuthGuard],},
];