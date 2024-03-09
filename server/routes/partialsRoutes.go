package routes

import (
	loadJson "gtz-main/server/functions"
	"html/template"
	"net/http"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/gorilla/mux"
)

func PartialsHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	name := vars["name"]

	if r.Header.Get("hx-request") != "true" {
		return
	}

	header := r.Header.Get("Accept-Language")
	tags := strings.Split(header, ",")
	highestQ := 0.0
	preferredLang := ""

	for _, lang := range tags {
		parts := strings.Split(lang, ";q=")
		if len(parts) == 2 {
			q, err := strconv.ParseFloat(parts[1], 64)
			if err == nil && q > highestQ {
				highestQ = q
				preferredLang = strings.Split(parts[0], "-")[0]
			}
		} else {
			preferredLang = strings.Split(parts[0], "-")[0]
			break
		}
	}

	langs := loadJson.GetLangs()
	langData, ok := langs[preferredLang][name].(map[string]interface{})
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
