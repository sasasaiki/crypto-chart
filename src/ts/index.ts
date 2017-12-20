$(function () {
    init()
})

var socket:WebSocket = null

function init() {
    let $messages = $("#messages")


    setWebSocket($messages)
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
