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

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(6);
	var common_1 = __webpack_require__(7);
	var accounts_base_1 = __webpack_require__(8);
	var tracker_1 = __webpack_require__(9);
	__webpack_require__(10);
	var LoginButtons = (function () {
	    function LoginButtons(zone) {
	        this.zone = zone;
	        this._initAutorun();
	        this.services = this._getLoginServices();
	        this.resetErrors();
	        this.isPasswordRecovery = false;
	        this.isSignup = false;
	        this.isDropdownOpen = false;
	        this._resetCredentialsFields();
	    }
	    LoginButtons.prototype._resetCredentialsFields = function () {
	        this.credentials = { email: '', password: '' };
	    };
	    LoginButtons.prototype.resetErrors = function () {
	        this.errors = [];
	        this.message = "";
	    };
	    LoginButtons.prototype.singleService = function () {
	        var services = this._getLoginServices();
	        return services[0];
	    };
	    LoginButtons.prototype.displayName = function () {
	        var user = this.currentUser;
	        if (!user)
	            return '';
	        if (user.profile && user.profile.name)
	            return user.profile.name;
	        if (user.username)
	            return user.username;
	        if (user.emails && user.emails[0] && user.emails[0].address)
	            return user.emails[0].address;
	        return '';
	    };
	    ;
	    LoginButtons.prototype.login = function () {
	        var _this = this;
	        this.resetErrors();
	        var email = this.credentials.email;
	        var password = this.credentials.password;
	        Meteor.loginWithPassword(email, password, function (error) {
	            if (error) {
	                _this.errors.push(error.reason || "Unknown error");
	            }
	            else {
	                _this.isDropdownOpen = false;
	                _this._resetCredentialsFields();
	            }
	        });
	    };
	    LoginButtons.prototype.recover = function () {
	        var _this = this;
	        this.resetErrors();
	        accounts_base_1.Accounts.forgotPassword({ email: this.credentials.email }, function (error) {
	            if (error) {
	                _this.errors.push(error.reason || "Unknown error");
	            }
	            else {
	                _this.message = "You will receive further instruction to you email address!";
	                _this.isDropdownOpen = false;
	                _this._resetCredentialsFields();
	            }
	        });
	    };
	    LoginButtons.prototype.logout = function () {
	        Meteor.logout();
	        this.isDropdownOpen = false;
	    };
	    LoginButtons.prototype.signup = function () {
	        var _this = this;
	        this.resetErrors();
	        accounts_base_1.Accounts.createUser(this.credentials, function (error) {
	            if (error) {
	                _this.errors.push(error.reason || "Unknown error");
	            }
	            else {
	                _this.isDropdownOpen = false;
	                _this._resetCredentialsFields();
	            }
	        });
	    };
	    LoginButtons.prototype._hasPasswordService = function () {
	        return !!Package['accounts-password'];
	    };
	    LoginButtons.prototype._getLoginServices = function () {
	        var services = Package['accounts-oauth'] ? accounts_base_1.Accounts.oauth.serviceNames() : [];
	        services.sort();
	        if (this._hasPasswordService())
	            services.push('password');
	        return _.map(services, function (name) {
	            return { name: name };
	        });
	    };
	    LoginButtons.prototype.dropdown = function () {
	        return this._hasPasswordService() || this._getLoginServices().length > 1;
	    };
	    LoginButtons.prototype._initAutorun = function () {
	        var _this = this;
	        this.autorunComputation = tracker_1.Tracker.autorun(function () {
	            _this.zone.run(function () {
	                _this.currentUser = Meteor.user();
	                _this.currentUserId = Meteor.userId();
	                _this.isLoggingIn = Meteor.loggingIn();
	                _this.isLoggedIn = !!Meteor.user();
	            });
	        });
	    };
	    LoginButtons = __decorate([
	        core_1.Component({
	            selector: 'login-buttons',
	            moduleId: Meteor.absoluteUrl(module.id),
	            template: __webpack_require__(14),
	            directives: [common_1.NgIf, common_1.NgFor]
	        }), 
	        __metadata('design:paramtypes', [core_1.NgZone])
	    ], LoginButtons);
	    return LoginButtons;
	}());
	exports.LoginButtons = LoginButtons;


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	module.exports = require("angular2/core");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("angular2/common");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("meteor/accounts-base");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("meteor/tracker");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./login-buttons.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./login-buttons.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".login-buttons {\n  position: relative;\n  display: inline-block;\n}\n.login-buttons .dropdown-toggle span {\n  cursor: pointer;\n}\n.login-buttons .accounts-close {\n  position: absolute;\n  top: 0;\n  right: 5px;\n  cursor: pointer;\n  font-weight: bold;\n  line-height: 20px;\n  text-decoration: underline;\n  opacity: 0.8;\n}\n.login-buttons .accounts-close:hover {\n  opacity: 1;\n}\n.login-buttons .content-container {\n  position: absolute;\n  top: 0;\n  left: 0;\n  border: 1px solid #ccc;\n  z-index: 1000;\n  background: white;\n  border-radius: 4px;\n  padding: 8px 12px;\n  margin: -8px -12px 0 -12px;\n  width: 250px;\n  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);\n  font-size: 16px;\n  color: #333;\n}\n.login-buttons .content-container > * {\n  line-height: 1.6;\n}\n.login-buttons .content-container > .login-close-text {\n  line-height: inherit;\n  font-size: inherit;\n  font-family: inherit;\n}\n.login-buttons .content-container label,\n.login-buttons .content-container .title {\n  font-size: 80%;\n  margin-top: 7px;\n  margin-bottom: -2px;\n}\n.login-buttons .content-container label {\n  display: inline;\n}\n.login-buttons .content-container input[type=text],\n.login-buttons .content-container input[type=email],\n.login-buttons .content-container input[type=password] {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 100%;\n}\n.login-buttons .content-container input[type=text][type],\n.login-buttons .content-container input[type=email][type],\n.login-buttons .content-container input[type=password][type] {\n  height: auto;\n}\n.login-buttons .loading {\n  line-height: 1;\n  background-image: url(data:image/gif;base64,R0lGODlhEAALAPQAAP///wAAANra2tDQ0Orq6gYGBgAAAC4uLoKCgmBgYLq6uiIiIkpKSoqKimRkZL6+viYmJgQEBE5OTubm5tjY2PT09Dg4ONzc3PLy8ra2tqCgoMrKyu7u7gAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA);\n  width: 16px;\n  background-position: center center;\n  background-repeat: no-repeat;\n}\n", ""]);

	// exports


/***/ },
/* 12 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "<div class=\"login-buttons\">\n  <div class=\"dropdown-toggle\" [hidden]=\"isDropdownOpen\" (click)=\"isDropdownOpen=true\">\n    <span *ngIf=\"isLoggedIn\">\n      {{ displayName() }} ▾\n    </span>\n    <span *ngIf=\"!isLoggedIn\">\n      Login ▾\n    </span>\n  </div>\n  <div class=\"content-container\" [hidden]=\"!isDropdownOpen\">\n    <div class=\"accounts-close\" (click)=\"isDropdownOpen=false\">Close</div>\n    <div *ngIf=\"isLoggedIn\">\n      <div class=\"login-text-and-button\">\n        <div class=\"login-display-name\">\n          {{ displayName() }}\n        </div>\n        <a class=\"login-buttons-logout\" (click)=\"logout()\" href=\"#\">Sign Out</a>\n      </div>\n    </div>\n    <div *ngIf=\"!isLoggedIn\">\n      <span [hidden]=\"!isLoggingIn\">Please wait...</span>\n      <form class=\"login-buttons-login-form\" [hidden]=\"isLoggingIn\">\n        <div *ngIf=\"message == ''\">\n\n          <label for=\"email\">Email</label>\n          <input class=\"login-buttons-email-input form-control\" type=\"email\" required [(ngModel)]=\"credentials.email\"/>\n          <div [hidden]=\"isPasswordRecovery\">\n            <label for=\"password\">Password</label>\n            <input class=\"login-buttons-password-input form-control\" type=\"password\" required\n                   [(ngModel)]=\"credentials.password\"/>\n          </div>\n        </div>\n        <br/>\n        <ul [hidden]=\"!errors || errors.length == 0\">\n          <li *ngFor=\"#error of errors\">\n            {{ error }}\n          </li>\n        </ul>\n        {{ message }}\n        <div *ngIf=\"message == ''\">\n          <button *ngIf=\"!isPasswordRecovery && !isSignup\" class=\"login-button-login\" (click)=\"login()\">Login</button>\n          <button *ngIf=\"!isPasswordRecovery && isSignup\" class=\"login-button-signup\" (click)=\"signup()\">Signup\n          </button>\n          <!--<button *ngIf=\"isPasswordRecovery && !isSignup\" class=\"login-button-recover\" (click)=\"recover()\">Recover-->\n          <!--</button>-->\n        </div>\n        <br/>\n        <a [hidden]=\"isSignup\" class=\"signup-button\" (click)=\"isSignup=true; isPasswordRecovery=false; resetErrors();\"\n           href=\"#\">Signup</a>\n        <!--<a [hidden]=\"isPasswordRecovery\" class=\"recover-button\"-->\n        <!--(click)=\"isPasswordRecovery=true; isSignup=false; resetErrors();\" href=\"#\">Recover Password</a>-->\n        <a [hidden]=\"!isSignup && !isPasswordRecovery\" class=\"login-button\"\n           (click)=\"isPasswordRecovery=false; isSignup=false; resetErrors();\" href=\"#\">Back to Login</a>\n      </form>\n    </div>\n  </div>\n</div>";

/***/ }
/******/ ])));