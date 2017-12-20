$(function () {
    init()
})

var socket:WebSocket = null


var charts:lineChart = null

function init() {
    let $messages = $("#messages")
    setWebSocket($messages)
    displayLineChart()
}


function setWebSocket($messages:JQuery) {
    if (!window["WebSocket"]) {
        alert("エラー:対応していないブラウザです")
    } else {
        socket = new WebSocket("wss://ws.zaif.jp:8888/stream?currency_pair=btc_jpy")
        socket.onclose = function() {
            console.log("接続が終了しました")
        }
        socket.onmessage = function (e) {
            // $messages.append($("<li>").text(e.data))
            if (charts != null){
                charts.Update(e.data)
            }
            console.log("onmessages");
        }
    }
}

function displayLineChart() {
    charts = new lineChart("lineChart")
    charts.Display()
}






class lineChart{
    private id :string;
    private lc:Chart
    constructor(id: string) {
        this.id = id;
    }
    public Display(){
        var canvas = <HTMLCanvasElement>document.getElementById(this.id);
        var ctx = canvas.getContext("2d");
        var labels: string[] = []
        var data: number[] = []
        for (var i = 0; i < 100; i++){
            labels.push(String(i))
            data.push(0)
        }
        this.lc = new Chart(ctx,
            {
                type: 'line',                           //◆棒グラフ

                data: {
                    //◆データ
                    labels: labels,     //ラベル名
                    datasets: [{                       //データ設定
                        data: data,          //データ内容
                        backgroundColor: [ '#FF44FF'],   //背景色
                        fill: false,

                    }]
                },

                options: {
                    animation:{
                        duration:0.2,
                    },
                    //◆オプション
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
                                labelString: '値段',  //ラベル
                                fontSize: 18               //フォントサイズ
                            },
                            ticks: {                      //最大値最小値設定
                                // min: 0,                   //最小値
                                // max: 30,                  //最大値
                                fontSize: 18,             //フォントサイズ
                                //stepSize: 5,            //軸間隔
                            },
                        }],
                        xAxes: [{                         //x軸設定
                            display: true,                //表示設定
                            barPercentage: 0.1,           //棒グラフ幅
                            categoryPercentage: 0.1,      //棒グラフ幅
                            scaleLabel: {                 //軸ラベル設定
                                display: true,             //表示設定
                                labelString: '時刻',  //ラベル
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

    public Update(data:string):void{
        this.l=this.l+1
        var d = JSON.parse(data) as apiData
        console.log(d.last_price.price);
        var date = new Date(d.timestamp)
        this.lc.data.labels.shift()
        this.lc.data.labels.push(String(date.getHours())+":"+String(date.getMinutes()))


        var hoge = this.lc.data.datasets[0].data
        for(var i = 0; i<hoge.length-1; i++){
            this.lc.data.datasets[0].data[i] = hoge[i+1];
            if (this.lc.data.datasets[0].data[i] <= 0){
                this.lc.data.datasets[0].data[i] = Number(d.last_price.price)
            }
        }
        this.lc.data.datasets[0].data[hoge.length-1] = Number(d.last_price.price);
        //下記のプロパティを差し替えることによって、グラフを動的に変更できる
        //グラフ描画指示
        this.lc.config.options.title.text = d.currency_pair

        this.lc.update()

    }

    private l =0
}


class apiData{
    public timestamp:string//"2015-04-01 18:16:01.739990",
    public last_price:last_price//{"action":"ask","price":30001},
    public currency_pair:string//"btc_jpy"
}
class last_price{
    public action:string
    public price:string
}
