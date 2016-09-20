/******/ (function(modules) { // webpackBootstrap
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
/***/ function(module, exports) {

	"use strict";

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var div = document.getElementById('first-res');
	var instructions = message.split(';');

	var gridArray = makeGridArray();

	//function creating grid 1000x1000
	function makeGridArray() {
		var param1 = arguments.length <= 0 || arguments[0] === undefined ? 1000 : arguments[0];
		var param2 = arguments.length <= 1 || arguments[1] === undefined ? 1000 : arguments[1];

		var grid = new Array(param1);

		for (var i = 0; i < grid.length; i++) {
			grid[i] = new Array(grid.length);

			for (var j = 0; j < param2; j++) {
				grid[i][j] = 0;
			}
		}
		return grid;
	}

	function turnOn() {
		var _ref = arguments.length <= 0 || arguments[0] === undefined ? arrCoord : arguments[0];

		var _ref2 = _slicedToArray(_ref, 4);

		var coord1 = _ref2[0];
		var coord2 = _ref2[1];
		var coord3 = _ref2[2];
		var coord4 = _ref2[3];
		var arr = arguments[1];


		for (var i = coord1; i <= coord3; i++) {
			for (var j = coord2; j <= coord4; j++) {
				arr[i][j] = 1;
			}
		}
	}

	function turnOff() {
		var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? arrCoord : arguments[0];

		var _ref4 = _slicedToArray(_ref3, 4);

		var coord1 = _ref4[0];
		var coord2 = _ref4[1];
		var coord3 = _ref4[2];
		var coord4 = _ref4[3];
		var arr = arguments[1];

		for (var i = coord1; i <= coord3; i++) {
			for (var j = coord2; j <= coord4; j++) {
				// debugger;
				arr[i][j] = 0;
			}
		}
	}

	function toggle() {
		var _ref5 = arguments.length <= 0 || arguments[0] === undefined ? arrCoord : arguments[0];

		var _ref6 = _slicedToArray(_ref5, 4);

		var coord1 = _ref6[0];
		var coord2 = _ref6[1];
		var coord3 = _ref6[2];
		var coord4 = _ref6[3];
		var arr = arguments[1];

		for (var i = coord1; i <= coord3; i++) {
			for (var j = coord2; j <= coord4; j++) {
				if (arr[i][j]) {
					arr[i][j] = 0;
				} else {
					arr[i][j] = 1;
				}
			}
		}
	}

	//function which count  how many lights are lit
	function countIncluded() {
		var arr = arguments.length <= 0 || arguments[0] === undefined ? gridArray : arguments[0];

		var counter = 0;

		for (var i = 0; i < arr.length; i++) {
			for (var j = 0; j < arr[i].length; j++) {
				if (arr[i][j]) {
					counter++;
				}
			}
		}
		return counter;

		console.log(arr);
	}

	// cut puzzle input and get coordunates and name of function
	function cutInput(str) {
		var arr = str.split(' ');
		var res = [];

		if (arr.length === 4) {
			var coordinates = arr[1].concat(',' + arr[3]).split(',');
			var funcName = arr[0];
		} else {
			var coordinates = arr[2].concat(',' + arr[4]).split(',');
			arr[1] = arr[1].charAt(0).toUpperCase() + arr[1].slice(1);
			var funcName = arr[0].concat(arr[1]);
		}

		res.push(coordinates);
		res.push(funcName);

		return res;
	}

	function getCoordinates(arr) {

		var coord = arr[0];
		var coordinates = coord.map(function (i) {
			return i++;
		});

		return coordinates;
	}

	function getFuncName(arr) {
		var funcName = arr[1];
		return funcName;
	}

	// function which accepts parameters of coordinates array
	//and name of function and call it
	function init(coordinates, funcName, arr) {

		if (funcName === 'turnOn') {
			turnOn(coordinates, arr);
		} else if (funcName === 'turnOff') {
			turnOff(coordinates, arr);
		} else if (funcName === 'toggle') {
			toggle(coordinates, arr);
		}

		var res = countIncluded();
		return res;
	}

	function getInstructions(instr) {

		var finalResult = instr.map(function (i) {
			var res = cutInput(i);
			var funcName = getFuncName(res);
			var coordinates = getCoordinates(res);
			return init(coordinates, funcName, gridArray);
		});

		div.innerHTML = finalResult[finalResult.length - 1] + '  lights are lit';
	}

	window.onload = function () {
		getInstructions(instructions);
	};

/***/ }
/******/ ]);