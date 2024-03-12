package routes

import (
	"gtz-main/server/functions/locales"
	"html/template"
	"net/http"
	"path/filepath"

	"github.com/gorilla/mux"
)

func WebsiteHandler(tmpls *template.Template, ENV string, SlugMap map[string]string, Langs map[string]locales.Langs) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		lang, langExists := vars["lang"]
		slug, slugExists := vars["slug"]

		if !langExists {
			lang = "en"
		}

		if !slugExists {
			if lang == "en" {
				slug = "home"
			} else {
				slug = "inicio"
			}
		}

		// Get the name of the template to be rendered
		page := SlugMap[slug]

		// Lookup the requested page
		tmpl := tmpls.Lookup(page + ".html")
		if tmpl == nil {
			http.Error(w, "Page not found", http.StatusNotFound)
			return
		}

		// Load the requested page's language data'
		langData, ok := Langs[lang][page].(map[string]interface{})
		if !ok {
			http.Error(w, "Language or slug not found", http.StatusNotFound)
			return
		}
		langData["lang"] = lang
		langData["slug"] = slug

		if ENV == "development" {
			directories := []string{
				"src/views/pages",
				"src/views/components",
				"src/views/components/base",
				"src/views/partials",
			}

			tmpls := template.New("")
			for _, directory := range directories {
				files, err := filepath.Glob(filepath.Join(directory, "*.html"))
				if err != nil {
					panic(err)
				}

				for _, file := range files {
					_, err = tmpls.ParseFiles(file)
					if err != nil {
						panic(err)
					}
				}
			}
			tmpl := tmpls.Lookup(page + ".html")
			if tmpl == nil {
				http.Error(w, "Page not found", http.StatusNotFound)
				return
			}
			// Execute the template
			err := tmpl.ExecuteTemplate(w, page, langData)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
		} else {
			// Execute the template
			err := tmpl.ExecuteTemplate(w, page, langData)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
		}
	}
}
