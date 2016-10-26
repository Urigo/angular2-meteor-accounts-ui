import {TypeDecorator} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Meteor} from 'meteor/meteor';
import {Observable, Subject} from "rxjs";
import {Tracker} from "meteor/tracker";

class InjectUserAnnotation {
  constructor(public propName: string = 'user') {
  }
}

export function InjectUser(propName?: string): (cls: any) => any {
  const annInstance = new InjectUserAnnotation(propName);
  const TypeDecorator: TypeDecorator = <TypeDecorator>function TypeDecorator(cls) {
    const propName = annInstance.propName;
    const fieldName = `_${propName}`;
    const injected = `${fieldName}Injected`;

    Object.defineProperty(cls.prototype, propName, {
      get: function () {
        if (!this[injected]) {
          this[fieldName] = Meteor.user();

          // If uses MeteorReactive / MeteorComponent
          if (this.autorun) {
            this.autorun(() => {
              this[fieldName] = Meteor.user();
            }, true);
          }
          // If uses MeteorReactive or nothing
          else {
            let zone = Zone.current;

            Tracker.autorun(() => {
              zone.run(() => {
                this[fieldName] = Meteor.user();
              });
            });
          }

          this[injected] = true;
        }
        return this[fieldName];
      },
      enumerable: true,
      configurable: false
    });
    return cls;
  };
  return TypeDecorator;
}


/**
 * A service to use as auth guard on the route.
 *
 */
export class AuthGuard implements CanActivate {
  canActivate(): Observable<boolean> {
    let subject = new Subject<boolean>();
    /*
     * Wait until Meteor isn't actively logging in to
     * decide that we're logged in or not.
     */
    Tracker.autorun((c) => {
      if (!Meteor.loggingIn()) {
        subject.next(!!Meteor.user());
        subject.complete();
        c.stop();
      }
    });

    return subject.asObservable();
  }
}
