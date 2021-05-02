/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./consts.js":
/*!*******************!*\
  !*** ./consts.js ***!
  \*******************/
/*! exports provided: sampleRate, attackSize, releaseSize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sampleRate", function() { return sampleRate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attackSize", function() { return attackSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "releaseSize", function() { return releaseSize; });
var sampleRate = 22050;
var attackSize = 500;
var releaseSize = 5000;

/***/ }),

/***/ "./modules/createModule.js":
/*!*********************************!*\
  !*** ./modules/createModule.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (func) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'transform';

  var returnFunc = function returnFunc(u, n, freqModulation) {
    return [u, n, freqModulation];
  };

  if (type === 'generator') {
    returnFunc = function returnFunc(u, n, freqModulation) {
      return func(u, n, freqModulation);
    };
  } else if (type === 'transform') {
    returnFunc = function returnFunc(u, n, freqModulation) {
      return func(u, n, freqModulation);
    };
  }

  return {
    func: returnFunc,
    type: type
  };
});

/***/ }),

/***/ "./modules/delay.js":
/*!**************************!*\
  !*** ./modules/delay.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../consts */ "./consts.js");
/* harmony import */ var _createModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createModule */ "./modules/createModule.js");


var time = 0.4;
var depth = 6;
var gain = 0.6;
var feedbackSize = _consts__WEBPACK_IMPORTED_MODULE_0__["sampleRate"] * 4 * depth;
var feedback = new Array(feedbackSize).fill(0);

function delay(u, n) {
  var delayAmountBySamples = time * _consts__WEBPACK_IMPORTED_MODULE_0__["sampleRate"];
  var cyclicN = n % feedbackSize;
  feedback[cyclicN] = u;

  for (var i = 1; i < depth; i++) {
    var feedbackIndex = Math.abs(cyclicN - i * delayAmountBySamples);
    var feedbackValue = feedback[feedbackIndex];
    u += Math.pow(gain, i) * feedbackValue;
  }

  return u;
}

/* harmony default export */ __webpack_exports__["default"] = (Object(_createModule__WEBPACK_IMPORTED_MODULE_1__["default"])(delay, 'transform'));

/***/ }),

/***/ "./modules/oscillator.js":
/*!*******************************!*\
  !*** ./modules/oscillator.js ***!
  \*******************************/
/*! exports provided: getSineWave, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSineWave", function() { return getSineWave; });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../consts */ "./consts.js");
/* harmony import */ var _createModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createModule */ "./modules/createModule.js");


var amplitude = 1;
var PiDividedBySampleRate = Math.PI / _consts__WEBPACK_IMPORTED_MODULE_0__["sampleRate"];
var twoPiDividedBySampleRate = PiDividedBySampleRate * 2;
var baseFreq = 440;
function getSineWave(u, n, freqModulation) {
  var frequency = baseFreq * freqModulation;
  var cyclicN = n % ~~(_consts__WEBPACK_IMPORTED_MODULE_0__["sampleRate"] / frequency);
  return Math.sin(frequency * twoPiDividedBySampleRate * cyclicN) * amplitude;
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_createModule__WEBPACK_IMPORTED_MODULE_1__["default"])(getSineWave, 'generator'));

/***/ }),

/***/ "./synth.js":
/*!******************!*\
  !*** ./synth.js ***!
  \******************/
/*! exports provided: getMasterClock, subscribeModule, subscribeGeneratingModule, waveGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMasterClock", function() { return getMasterClock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeModule", function() { return subscribeModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeGeneratingModule", function() { return subscribeGeneratingModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "waveGenerator", function() { return waveGenerator; });
/* harmony import */ var _modules_oscillator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/oscillator */ "./modules/oscillator.js");
/* harmony import */ var _modules_delay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/delay */ "./modules/delay.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var masterClock = 0;
var getMasterClock = function getMasterClock() {
  return masterClock;
};
var modules = [];
var generatingModules = [];
var subscribeModule = function subscribeModule(module) {
  modules.push(module);
  return function () {
    var index = modules.findIndex(function (_module) {
      return _module === module;
    });
    modules = [].concat(_toConsumableArray(modules.slice(0, index)), _toConsumableArray(modules.slice(index + 1)));
  };
};
var subscribeGeneratingModule = function subscribeGeneratingModule(module) {
  generatingModules.push(module);
  return function () {
    var index = generatingModules.findIndex(function (_module) {
      return _module === module;
    });
    generatingModules = [].concat(_toConsumableArray(generatingModules.slice(0, index)), _toConsumableArray(generatingModules.slice(index + 1)));
  };
};
subscribeGeneratingModule(_modules_oscillator__WEBPACK_IMPORTED_MODULE_0__["default"]);
subscribeModule(_modules_delay__WEBPACK_IMPORTED_MODULE_1__["default"]);
function waveGenerator(triggers) {
  var wave = 0;
  Object.keys(triggers).forEach(function (id) {
    var _triggers$id = triggers[id],
        frequencyModulation = _triggers$id.frequencyModulation,
        shouldGenerate = _triggers$id.shouldGenerate;
    if (!shouldGenerate) return;
    wave = generatingModules.reduce(function (acc, _ref) {
      var func = _ref.func;
      return acc + func(acc, masterClock, frequencyModulation);
    }, wave);
  });
  wave = modules.reduce(function (acc, _ref2) {
    var func = _ref2.func;
    return func(acc, masterClock);
  }, wave);
  masterClock++; // Decrease volume 

  var mixVolume = 0.2;
  return wave * mixVolume;
}

/***/ }),

/***/ "./worklet/synthWorklet.js":
/*!*********************************!*\
  !*** ./worklet/synthWorklet.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _synth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../synth */ "./synth.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var triggers = {};

var SynthWorklet = /*#__PURE__*/function (_AudioWorkletProcesso) {
  _inherits(SynthWorklet, _AudioWorkletProcesso);

  var _super = _createSuper(SynthWorklet);

  function SynthWorklet() {
    var _this;

    _classCallCheck(this, SynthWorklet);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.port.onmessage = function (e) {
      triggers = JSON.parse(e.data);
    };

    return _this;
  }

  _createClass(SynthWorklet, [{
    key: "process",
    value: function process(inputs, outputs, parameters) {
      var input = inputs[0];
      var output = outputs[0];

      for (var channel = 0; channel < output.length; ++channel) {
        for (var i = 0; i < output[channel].length; ++i) {
          output[channel][i] = Object(_synth__WEBPACK_IMPORTED_MODULE_0__["waveGenerator"])(triggers); //window.waveGenerator.next()
        }
      }

      return true;
    }
  }]);

  return SynthWorklet;
}( /*#__PURE__*/_wrapNativeSuper(AudioWorkletProcessor));

registerProcessor('synth', SynthWorklet);

/***/ }),

/***/ 0:
/*!***************************************!*\
  !*** multi ./worklet/synthWorklet.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./worklet/synthWorklet.js */"./worklet/synthWorklet.js");


/***/ })

/******/ });
//# sourceMappingURL=worklet.js.map