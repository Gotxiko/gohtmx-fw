package routes

import (
	loadJson "gtz-main/server"
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

	lang := r.Header.Get("Accept-Language")

	langs := loadJson.GetLangs()
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