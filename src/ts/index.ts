$(function () {
    init()
})

var socket:WebSocket = null

function init() {
    let $messages = $("#messages")
    setWebSocket($messages)
    displayLineChart()
}


function setWebSocket($messages:JQuery) {
    if (!window["WebSocket"]) {
        alert("エラー:対応していないブラウザです")
    } else {
        socket = new WebSocket("wss://ws.zaif.jp:8888/stream?currency_pair=mona_jpy")
        socket.onclose = function() {
            console.log("接続が終了しました")
        }
        socket.onmessage = function (e) {
            $messages.append($("<li>").text(e.data))
            console.log("onmessages");
        }
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
    var canvas = <HTMLCanvasElement>document.getElementById("lineChart");
    var ctx = canvas.getContext("2d");
    var lc = new Chart(ctx,
        {
            type: 'bar',                           //◆棒グラフ
            data: {                                //◆データ
                labels: ['A','B','C','D','E'],     //ラベル名
                datasets: [{                       //データ設定
                    data: [5,20,11,2,30],          //データ内容
                    backgroundColor: ['#FF4444', '#4444FF', '#44BB44', '#FFFF44', '#FF44FF']   //背景色
                }]
            },
            options: {                             //◆オプション
                responsive: true,                  //グラフ自動設定
                legend: {                          //凡例設定
                    display: false                 //表示設定
                },
                title: {                           //タイトル設定
                    display: true,                 //表示設定
                    fontSize: 18,                  //フォントサイズ
                    text: 'タイトル'                //ラベル
                },
                scales: {                          //軸設定
                    yAxes: [{                      //y軸設定
                        display: true,             //表示設定
                        scaleLabel: {              //軸ラベル設定
                            display: true,          //表示設定
                            labelString: '縦軸ラベル',  //ラベル
                            fontSize: 18               //フォントサイズ
                        },
                        ticks: {                      //最大値最小値設定
                            min: 0,                   //最小値
                            max: 30,                  //最大値
                            fontSize: 18,             //フォントサイズ
                            //stepSize: 5,            //軸間隔
                        },
                    }],
                    xAxes: [{                         //x軸設定
                        display: true,                //表示設定
                        barPercentage: 0.4,           //棒グラフ幅
                        categoryPercentage: 0.4,      //棒グラフ幅
                        scaleLabel: {                 //軸ラベル設定
                            display: true,             //表示設定
                            labelString: '横軸ラベル',  //ラベル
                            fontSize: 18               //フォントサイズ
                        },
                        ticks: {
                            fontSize: 18             //フォントサイズ
                        },
                    }],
                },
                layout: {                             //レイアウト
                    padding: {                          //余白設定
                        left: 100,
                        right: 50,
                        top: 0,
                        bottom: 0
                    }
                }
            }}
        );
}
