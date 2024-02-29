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

	// Load langs file from the request header language to send the proper language contents to the partial
	lang := r.Header.Get("Accept-Language")

	langData, ok := langs[lang][name].(map[string]interface{})
	if !ok {
		http.Error(w, "Language or slug not found", http.StatusNotFound)
		return
	}

	tmpl, err := template.ParseFiles(filepath.Join("partials", name+".html"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = tmpl.Execute(w, langData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}