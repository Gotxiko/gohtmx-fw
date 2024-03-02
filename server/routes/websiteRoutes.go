package routes

import (
	"fmt"
	loadJson "gtz-main/server/functions"
	"html/template"
	"net/http"

	"github.com/gorilla/mux"
)

func WebsiteHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	lang, langExists := vars["lang"]
	slug, slugExists := vars["slug"]
	if handleDefaultRedirections(w, r, lang, langExists, slugExists) {
		return
	}

	// Get the name of the template to be rendered
	slugMap := loadJson.GetSlugMap()
	page := slugMap[slug]

	// Parse the requested page and all components
	tmpl := template.New("")
	_, err := tmpl.New(page).ParseFiles("pages/" + page + ".html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	_, err = tmpl.ParseGlob("components/shared/*.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	// Parse the components specific to the requested page,
	_, err = tmpl.ParseGlob("components/" + page + "/*.html")
	if err != nil {
		fmt.Println("Notice: The page doesn't have specific components.", page)
	}

	// Load the requested page's language data'
	langs := loadJson.GetLangs()
	langData, ok := langs[lang][page].(map[string]interface{})
	if !ok {
		http.Error(w, "Language or slug not found", http.StatusNotFound)
		return
	}
	langData["lang"] = lang

	// Execute the template
	err = tmpl.ExecuteTemplate(w, page, langData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func handleDefaultRedirections(w http.ResponseWriter, r *http.Request, lang string, langExists bool, slugExists bool) bool {
	if !langExists || !slugExists {
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
