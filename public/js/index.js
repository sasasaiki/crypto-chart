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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

$(function () {
    init();
});
var socket = null;
function init() {
    var $messages = $("#messages");
    setWebSocket($messages);
    displayLineChart();
}
function setWebSocket($messages) {
    if (!window["WebSocket"]) {
        alert("エラー:対応していないブラウザです");
    }
    else {
        socket = new WebSocket("wss://ws.zaif.jp:8888/stream?currency_pair=mona_jpy");
        socket.onclose = function () {
            console.log("接続が終了しました");
        };
        socket.onmessage = function (e) {
            $messages.append($("<li>").text(e.data));
            console.log("onmessages");
        };
    }
}
function displayLineChart() {
    var data = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [
            {
                label: "Prime and Fibonacci",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
            }
        ]
    };
    var canvas = document.getElementById("lineChart");
    var ctx = canvas.getContext("2d");
    var lc = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['A', 'B', 'C', 'D', 'E'],
            datasets: [{
                    data: [5, 20, 11, 2, 30],
                    backgroundColor: ['#FF4444', '#4444FF', '#44BB44', '#FFFF44', '#FF44FF']
                }]
        },
        options: {
            responsive: true,
            legend: {
                display: false
            },
            title: {
                display: true,
                fontSize: 18,
                text: 'タイトル'
            },
            scales: {
                yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: '縦軸ラベル',
                            fontSize: 18
                        },
                        ticks: {
                            min: 0,
                            max: 30,
                            fontSize: 18,
                        },
                    }],
                xAxes: [{
                        display: true,
                        barPercentage: 0.4,
                        categoryPercentage: 0.4,
                        scaleLabel: {
                            display: true,
                            labelString: '横軸ラベル',
                            fontSize: 18
                        },
                        ticks: {
                            fontSize: 18
                        },
                    }],
            },
            layout: {
                padding: {
                    left: 100,
                    right: 50,
                    top: 0,
                    bottom: 0
                }
            }
        }
    });
}


/***/ })
/******/ ]);
//# sourceMappingURL=../map/ts-map/index.js.map