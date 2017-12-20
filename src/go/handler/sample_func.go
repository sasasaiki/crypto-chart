package handler

import (
	"io"
	"log"
	"net/http"
)

//Get zaifのチャートを返す
func (h *ProdHandlingFunc) Get(w http.ResponseWriter, r *http.Request) {
}

func outputError(w *http.ResponseWriter, e error, message string) {
	io.WriteString(*w, e.Error())
	log.Println(message, " エラーが発生しました:", e)
}
