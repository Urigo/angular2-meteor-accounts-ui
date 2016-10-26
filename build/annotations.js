import { Meteor } from 'meteor/meteor';
var InjectUserAnnotation = (function () {
    function InjectUserAnnotation(propName) {
        if (propName === void 0) { propName = 'user'; }
        this.propName = propName;
    }
    return InjectUserAnnotation;
}());
export function InjectUser(propName) {
    var annInstance = new InjectUserAnnotation(propName);
    var TypeDecorator = function TypeDecorator(cls) {
        var propName = annInstance.propName;
        var fieldName = "_" + propName;
        var injected = fieldName + "Injected";
        Object.defineProperty(cls.prototype, propName, {
            get: function () {
                var _this = this;
                if (!this[injected]) {
                    this[fieldName] = Meteor.user();
                    // If uses MeteorReactive / MeteorComponent
                    if (this.autorun) {
                        this.autorun(function () {
                            _this[fieldName] = Meteor.user();
                        }, true);
                    }
                    else {
                        var zone_1 = Zone.current;
                        Tracker.autorun(function () {
                            zone_1.run(function () {
                                _this[fieldName] = Meteor.user();
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
export var AuthGuard = (function () {
    function AuthGuard() {
    }
    AuthGuard.prototype.canActivate = function () {
        return !!Meteor.user();
    };
    return AuthGuard;
}());
