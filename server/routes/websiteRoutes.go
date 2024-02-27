package routes

import (
	"html/template"
	"net/http"
	"path/filepath"
)

func HandleWebsiteRequest(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path

	tmpl, err := template.ParseFiles(filepath.Join("pages", path+".html"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = tmpl.Execute(w, nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
