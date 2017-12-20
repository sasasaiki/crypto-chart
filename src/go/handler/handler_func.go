package handler

import (
	"net/http"
)

//====新しいハンドラーFuncは以下に追加====

//HandlingFuncI ハンドリングすべき全てのfuncを持つ。ハンドリングするfuncを増やす場合は追加
type HandlingFuncI interface {
	Get(w http.ResponseWriter, r *http.Request)
}

//NewHandlingFuncs funcの設定を配列としてもつ。新しくハンドリングするときはここに追加。
func NewHandlingFuncs(h HandlingFuncI) []HandlingFunc {
	return []HandlingFunc{
		{
			Function: h.Get,
			Conf: &HandlingConf{
				Path:      "/get/chart/zaft",
				Methods:   []string{"GET"},
				NeedLogin: false,
			},
		},
	}
}

//HandlingFunc ハンドリングするfuncとその情報を持つ
type HandlingFunc struct {
	Function func(w http.ResponseWriter, r *http.Request)
	Conf     *HandlingConf
}

// ProdHandlingFunc 本番用。複数のエンドポイントで共有させたいオブジェクトとかもたせる。DBのコネクションとか？
type ProdHandlingFunc struct {
}

// 開発用などあれば以下に追加
