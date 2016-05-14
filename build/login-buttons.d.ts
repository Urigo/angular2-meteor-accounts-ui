import { NgZone } from '@angular/core';
import { Tracker } from 'meteor/tracker';
export interface LoginCredentials {
    email: string;
    password: string;
}
export declare class LoginButtons {
    private zone;
    autorunComputation: Tracker.Computation;
    currentUser: Object;
    currentUserId: string;
    isLoggingIn: boolean;
    isLoggedIn: boolean;
    services: Array<any>;
    credentials: LoginCredentials;
    errors: Array<string>;
    isPasswordRecovery: boolean;
    isSignup: boolean;
    isDropdownOpen: boolean;
    message: string;
    constructor(zone: NgZone);
    _resetCredentialsFields(): void;
    resetErrors(): void;
    singleService(): Object;
    displayName(): string;
    login(): void;
    recover(): void;
    logout(): void;
    signup(): void;
    _hasPasswordService(): boolean;
    _getLoginServices(): Array<any>;
    dropdown(): boolean;
    _initAutorun(): void;
}
