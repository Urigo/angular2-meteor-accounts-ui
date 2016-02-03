(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var decorators_1 = __webpack_require__(1);
	var lifecycle_annotations_impl_1 = __webpack_require__(2);
	var InjectUserAnnotation = (function () {
	    function InjectUserAnnotation(propName) {
	        if (propName === void 0) { propName = 'user'; }
	        this.propName = propName;
	    }
	    return InjectUserAnnotation;
	})();
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
	                    this[fieldName] = Meteor.user();
	                    if (this.autorun) {
	                        Meteor.setTimeout(function () {
	                            _this.autorun(function () {
	                                _this[fieldName] = Meteor.user();
	                            }, true);
	                        }, 0);
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
	/**
	 * Here CanActivate is an internal class (not present in the typings)
	 * defined at angular/modules/angular2/src/router/lifecycle_annotations_impl.ts.
	 * Each annotation designed to implement activation logic should extend it.
	 */
	var RequireUserAnnotation = (function (_super) {
	    __extends(RequireUserAnnotation, _super);
	    function RequireUserAnnotation() {
	        _super.call(this, this.canProceed.bind(this));
	    }
	    RequireUserAnnotation.prototype.canProceed = function (prev, next) {
	        return !!Meteor.user();
	    };
	    return RequireUserAnnotation;
	})(lifecycle_annotations_impl_1.CanActivate);
	exports.RequireUser = decorators_1.makeDecorator(RequireUserAnnotation);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("angular2/src/core/util/decorators");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("angular2/src/router/lifecycle_annotations_impl");

/***/ }
/******/ ])));