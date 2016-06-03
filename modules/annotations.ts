import {TypeDecorator} from '@angular/core';
import {makeDecorator} from '@angular/core/src/util/decorators';
import {ComponentInstruction} from '@angular/router-deprecated';
import {CanActivate} from '@angular/router-deprecated/src/lifecycle/lifecycle_annotations_impl';
import {Meteor} from 'meteor/meteor';

class InjectUserAnnotation {
  constructor(public propName: string = 'user') {}
}

export function InjectUser(propName?: string): (cls: any) => any {
  const annInstance = new InjectUserAnnotation(propName);
  const TypeDecorator: TypeDecorator = <TypeDecorator>function TypeDecorator(cls) {
    const propName = annInstance.propName;
    const fieldName = `_${propName}`;
    const injected = `${fieldName}Injected`;
    Object.defineProperty(cls.prototype, propName, {
      get: function() {
        if (!this[injected]) {
          this[fieldName] = Meteor.user();
          if (this.autorun) {
            this.autorun(() => {
              this[fieldName] = Meteor.user();
            }, true);
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
};

/**
 * Here CanActivate is an internal class (not present in the typings)
 * defined at angular/modules/angular2/src/router/lifecycle_annotations_impl.ts.
 * Each annotation designed to implement activation logic should extend it.
 */
class RequireUserAnnotation extends CanActivate {
  constructor() {
    super(this.canProceed.bind(this));
  }

  canProceed(prev: ComponentInstruction,
             next: ComponentInstruction) {
    return !!Meteor.user();
  }
}

export const RequireUser = makeDecorator(RequireUserAnnotation);
