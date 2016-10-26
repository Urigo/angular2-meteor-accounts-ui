import {TypeDecorator} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Meteor} from 'meteor/meteor';
import {Observable, Subject, ReplaySubject, Observer} from "rxjs";
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
    return Observable.create((observer: Observer) => {
      Tracker.autorun((c) => {
        if (!Meteor.loggingIn()) {
          observer.next(!!Meteor.user());
          observer.complete();
          c.stop();
        }
      });
    });
  }
}
