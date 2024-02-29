package routes

import (
	"html/template"
	"net/http"
	"path/filepath"

	"github.com/gorilla/mux"
)

func PartialsHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	name := vars["name"]

	if r.Header.Get("hx-request") != "true" {
		return
	}

	tmpl, err := template.ParseFiles(filepath.Join("partials", name+".html"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = tmpl.Execute(w, nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
