package routes

import (
	loadJson "gtz-main/server/functions"
	"html/template"
	"net/http"
	"path/filepath"

	"github.com/gorilla/mux"
)

func WebsiteHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	lang, langExists := vars["lang"]
	slug, slugExists := vars["slug"]
	if handleDefaultRedirections(w, r, lang, langExists, slugExists) {
		return
	}

	slugMap := loadJson.GetSlugMap()
	page := slugMap[slug]

	tmpl, err := template.ParseFiles(filepath.Join("pages", page+".html"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	langs := loadJson.GetLangs()
	langData, ok := langs[lang][page].(map[string]interface{})
	langData["lang"] = lang

	if !ok {
		http.Error(w, "Language or slug not found", http.StatusNotFound)
		return
	}

	err = tmpl.Execute(w, langData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func handleDefaultRedirections(w http.ResponseWriter, r *http.Request, lang string, langExists bool, slugExists bool) bool {
	if !langExists {
		http.Redirect(w, r, "/es/inicio", http.StatusFound)
		return true
	}

	if !slugExists {
		switch lang {
		case "es":
			http.Redirect(w, r, "/es/inicio", http.StatusFound)
		case "en":
			http.Redirect(w, r, "/en/home", http.StatusFound)
		default:
			http.Redirect(w, r, "/es/inicio", http.StatusFound)
		}
		return true
	}

	return false
}
