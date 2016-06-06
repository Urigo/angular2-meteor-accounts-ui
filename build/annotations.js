"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var decorators_1 = require('@angular/core/src/util/decorators');
var lifecycle_annotations_impl_1 = require('@angular/router-deprecated/src/lifecycle/lifecycle_annotations_impl');
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
;
var RequireUserAnnotation = (function (_super) {
    __extends(RequireUserAnnotation, _super);
    function RequireUserAnnotation() {
        _super.call(this, this.canProceed.bind(this));
    }
    RequireUserAnnotation.prototype.canProceed = function (prev, next) {
        return !!meteor_1.Meteor.user();
    };
    return RequireUserAnnotation;
}(lifecycle_annotations_impl_1.CanActivate));
exports.RequireUser = decorators_1.makeDecorator(RequireUserAnnotation);
