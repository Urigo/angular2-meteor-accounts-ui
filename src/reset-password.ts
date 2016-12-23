import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { Accounts } from 'meteor/accounts-base'

@Component({
  selector: 'reset-password',
  styles: [
    `
      .reset-password {
        position: relative;
        display: inline-block;
      }

      .reset-password .content-container {
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid #ccc;
        z-index: 1000;
        background: white;
        border-radius: 4px;
        padding: 8px 12px;
        margin: -8px -12px 0 -12px;
        width: 250px;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);
        -webkit-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);
        font-size: 16px;
        color: #333;
        line-height: 1.6;
      }

      .reset-password .content-container label {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 80%;
        margin-top: 7px;
        margin-bottom: -2px;
        display: inline;
      }

      .reset-password .content-container input {
        padding: 4px;
        margin: 0px;
        border: 1px solid #aaa;
        line-height: 1;
        box-sizing: border-box;
        width: 100%;
        height: auto;
      }

      .reset-password #reset-button {
        width: 100%;
        margin: 8px 0px 4px 0px;
        cursor: pointer;
        user-select: none;
        padding: 4px 8px;
        font-size: 80%;
        line-height: 1.5;
        text-align: center;
        color: #fff;
        background: #596595;
        background-image: initial;
        background-position-x: initial;
        background-position-y: initial;
        background-size: initial;
        background-repeat-x: initial;
        background-repeat-y: initial;
        background-attachment: initial;
        background-origin: initial;
        background-clip: initial;
        background-color: rgb(89, 101, 149);
        border: 1px solid #464f75;
        border-top-color: rgb(70, 79, 117);
        border-top-style: solid;
        border-top-width: 1px;
        border-right-color: rgb(70, 79, 117);
        border-right-style: solid;
        border-right-width: 1px;
        border-bottom-color: rgb(70, 79, 117);
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-left-color: rgb(70, 79, 117);
        border-left-style: solid;
        border-left-width: 1px;
        border-image-source: initial;
        border-image-slice: initial;
        border-image-width: initial;
        border-image-outset: initial;
        border-image-repeat: initial;
        border-radius: 4px;
      }`],
  template: `
    <div class="reset-password">
      <div class="content-container">
          <form class="reset-password-form">
            <div>
              <label for="password">New Password</label>
              <input class="form-control" type="password" name="password" required [(ngModel)]="password"/>
            </div>
            <label [hidden]="!error">{{ error }}</label>
            <button id="reset-button" (click)="resetPassword()" [disabled]="processing || !token">Set password</button>
          </form>
      </div>
    </div>
  `
})
export class ResetPassword implements OnInit, OnDestroy {
  private error: string = "No token found";
  private token: string;
  private password: string;
  private processing: boolean = false;
  private routeSubscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private zone: NgZone) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params: any) => {
      this.token = params.token;
      if (this.token) { this.error = ""; };
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  private resetPassword(): void {
    this.processing = true;
    Accounts.resetPassword(this.token, this.password, (error) => {
      this.zone.run(()=>{
        this.processing = false;
        if (error) {
          this.error = error;
        } else {
          this.router.navigate(['/']);
        }
      });
    });
  }
}
