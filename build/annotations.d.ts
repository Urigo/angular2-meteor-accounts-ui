import { CanActivate } from '@angular/router';
export declare function InjectUser(propName?: string): (cls: any) => any;
/**
 * A service to use as auth guard on the route.
 *
 */
export declare class AuthGuard implements CanActivate {
    canActivate(): boolean;
}
