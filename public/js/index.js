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
var charts = null;
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
        socket = new WebSocket("wss://ws.zaif.jp:8888/stream?currency_pair=btc_jpy");
        socket.onclose = function () {
            console.log("接続が終了しました");
        };
        socket.onmessage = function (e) {
            if (charts != null) {
                charts.Update(e.data);
            }
            console.log("onmessages");
        };
    }
}
function displayLineChart() {
    charts = new lineChart("lineChart");
    charts.Display();
}
var lineChart = (function () {
    function lineChart(id) {
        this.l = 0;
        this.id = id;
    }
    lineChart.prototype.Display = function () {
        var canvas = document.getElementById(this.id);
        var ctx = canvas.getContext("2d");
        var labels = [];
        var data = [];
        for (var i = 0; i < 100; i++) {
            labels.push(String(i));
            data.push(0);
        }
        this.lc = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                        data: data,
                        backgroundColor: ['#FF44FF'],
                        fill: false,
                    }]
            },
            options: {
                animation: {
                    duration: 0.2,
                },
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
                                labelString: '値段',
                                fontSize: 18
                            },
                            ticks: {
                                fontSize: 18,
                            },
                        }],
                    xAxes: [{
                            display: true,
                            barPercentage: 0.1,
                            categoryPercentage: 0.1,
                            scaleLabel: {
                                display: true,
                                labelString: '時刻',
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
    };
    lineChart.prototype.Update = function (data) {
        this.l = this.l + 1;
        var d = JSON.parse(data);
        console.log(d.last_price.price);
        var date = new Date(d.timestamp);
        this.lc.data.labels.shift();
        this.lc.data.labels.push(String(date.getHours()) + ":" + String(date.getMinutes()));
        var hoge = this.lc.data.datasets[0].data;
        for (var i = 0; i < hoge.length - 1; i++) {
            this.lc.data.datasets[0].data[i] = hoge[i + 1];
            if (this.lc.data.datasets[0].data[i] <= 0) {
                this.lc.data.datasets[0].data[i] = Number(d.last_price.price);
            }
        }
        this.lc.data.datasets[0].data[hoge.length - 1] = Number(d.last_price.price);
        this.lc.config.options.title.text = d.currency_pair;
        this.lc.update();
    };
    return lineChart;
}());
var apiData = (function () {
    function apiData() {
    }
    return apiData;
}());
var last_price = (function () {
    function last_price() {
    }
    return last_price;
}());


/***/ })
/******/ ]);
//# sourceMappingURL=../map/ts-map/index.js.map