package routes

import (
	"gtz-main/server/functions/locales"
	"html/template"
	"net/http"
	"path/filepath"

	"github.com/gorilla/mux"
)

func PartialsHandler(Langs map[string]locales.Langs) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		name := vars["name"]

		if r.Header.Get("hx-request") != "true" {
			return
		}

		preferredLang := r.Header.Get("Accept-Language")

		langData, ok := Langs[preferredLang][name].(map[string]interface{})
		if !ok {
			http.Error(w, "Language or slug not found", http.StatusNotFound)
			return
		}

		tmpl, err := template.ParseFiles(filepath.Join("src/views/partials", name+".html"))
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		err = tmpl.Execute(w, langData)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}
}
