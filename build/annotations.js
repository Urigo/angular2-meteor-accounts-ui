"use strict";
var meteor_1 = require('meteor/meteor');
var InjectUserAnnotation = (function () {
    function InjectUserAnnotation(propName) {
        if (propName === void 0) { propName = 'user'; }
        this.propName = propName;
    }
    return InjectUserAnnotation;
}());
function InjectUser(propName) {
    var annInstance = new InjectUserAnnotation(propName);
    var TypeDecorator = function TypeDecorator(cls) {
        var propName = annInstance.propName;
        var fieldName = "_" + propName;
        var injected = fieldName + "Injected";
        Object.defineProperty(cls.prototype, propName, {
            get: function () {
                var _this = this;
                if (!this[injected]) {
                    this[fieldName] = meteor_1.Meteor.user();
                    if (this.autorun) {
                        this.autorun(function () {
                            _this[fieldName] = meteor_1.Meteor.user();
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
}
exports.InjectUser = InjectUser;
/**
 * Here CanActivate is an internal class (not present in the typings)
 * defined at angular/modules/@angular/router-deprecated/src/lifecycle/lifecycle_annotations_impl.ts
 * Each annotation designed to implement activation logic should extend it.
 */
//  export class RequireUserAnnotation extends CanActivate {
//    constructor() {
//     super();
//    }
//
//
//      canActivate (){
//        return !!Meteor.user();
//
//    }
//  }
//
// export const RequireUser = makeDecorator(RequireUserAnnotation);
//# sourceMappingURL=annotations.js.map