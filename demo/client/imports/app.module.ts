import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AccountsModule} from "angular2-meteor-accounts-ui";
import {RouterModule} from "@angular/router";
import {GuardedComponent} from "./guarded/guarded.component";
import {AppComponent} from "./app/app.component";
import {APP_ROUTES} from "./app/app.routes";
import {MainComponent} from "./main/main.component";


@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    GuardedComponent,
    MainComponent
  ],
  // Entry Components
  entryComponents: [
    AppComponent,
    GuardedComponent,
    MainComponent
  ],
  // Providers
  providers: [],
  // Modules
  imports: [
    BrowserModule,
    AccountsModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  // Main Component
  bootstrap: [MainComponent]
})
export class AppModule {
}
