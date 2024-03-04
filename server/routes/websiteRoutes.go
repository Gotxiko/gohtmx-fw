package routes

import (
	loadJson "gtz-main/server/functions"
	"html/template"
	"net/http"

	"github.com/gorilla/mux"
)

func WebsiteHandler(tmpls *template.Template) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		lang, langExists := vars["lang"]
		slug, slugExists := vars["slug"]

		if !langExists {
			lang = "es"
		}

		if !slugExists {
			if lang == "es" {
				slug = "inicio"
			} else {
				slug = "home"
			}
		}

		// Get the name of the template to be rendered
		slugMap := loadJson.GetSlugMap()
		page := slugMap[slug]

		// Lookup the requested page
		tmpl := tmpls.Lookup(page + ".html")
		if tmpl == nil {
			http.Error(w, "Page not found", http.StatusNotFound)
			return
		}

		// Load the requested page's language data'
		langs := loadJson.GetLangs()
		langData, ok := langs[lang][page].(map[string]interface{})
		if !ok {
			http.Error(w, "Language or slug not found", http.StatusNotFound)
			return
		}
		langData["lang"] = lang
		langData["slug"] = slug

		// Execute the template
		err := tmpl.ExecuteTemplate(w, page, langData)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
