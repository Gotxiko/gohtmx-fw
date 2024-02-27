package routes

import (
	"html/template"
	"net/http"
	"path/filepath"
)

func HandlePartialRequest(w http.ResponseWriter, r *http.Request) {

	if r.Header.Get("hx-request") != "true" {
		return
	}

	path := r.URL.Path

	tmpl, err := template.ParseFiles(filepath.Join(path + ".html"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = tmpl.Execute(w, nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
