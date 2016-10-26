"use strict";
var meteor_1 = require('meteor/meteor');
var rxjs_1 = require("rxjs");
var tracker_1 = require("meteor/tracker");
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
                    // If uses MeteorReactive / MeteorComponent
                    if (this.autorun) {
                        this.autorun(function () {
                            _this[fieldName] = meteor_1.Meteor.user();
                        }, true);
                    }
                    else {
                        var zone_1 = Zone.current;
                        tracker_1.Tracker.autorun(function () {
                            zone_1.run(function () {
                                _this[fieldName] = meteor_1.Meteor.user();
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
exports.InjectUser = InjectUser;
/**
 * A service to use as auth guard on the route.
 *
 */
var AuthGuard = (function () {
    function AuthGuard() {
    }
    AuthGuard.prototype.canActivate = function () {
        var subject = new rxjs_1.Subject();
        /*
         * Wait until Meteor isn't actively logging in to
         * decide that we're logged in or not.
         */
        tracker_1.Tracker.autorun(function (c) {
            if (!meteor_1.Meteor.loggingIn()) {
                subject.next(!!meteor_1.Meteor.user());
                subject.complete();
                c.stop();
            }
        });
        return subject.asObservable();
    };
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
