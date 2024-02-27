package routes

import (
	"encoding/json"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"
	"github.com/nicksnyder/go-i18n/v2/i18n"
	"golang.org/x/text/language"
)

var bundle *i18n.Bundle
var slugToFileMap map[string]string

func init() {
	bundle = i18n.NewBundle(language.Spanish)
	bundle.MustLoadMessageFile("locales/es/langs.json")
	bundle.MustLoadMessageFile("locales/en/langs.json")

	loadSlugToFileMap()
}

func WebsiteHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	lang := vars["lang"]
	slug := vars["slug"]

	if fileName, ok := slugToFileMap[slug]; ok {
        slug = fileName
    }

	localizer := i18n.NewLocalizer(bundle, lang)

	tmpl, err := template.New(filepath.Join("pages", slug + ".html")).Funcs(template.FuncMap{
		"i18n": func(id string) string {
			return localizer.MustLocalize(&i18n.LocalizeConfig{DefaultMessage: &i18n.Message{ID: id}})
		},
	}).ParseFiles(filepath.Join("pages", slug + ".html"))

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = tmpl.Execute(w, nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func loadSlugToFileMap() {
    jsonFile, err := os.Open("locales/slugToFileMap.json")
    if err != nil {
        log.Fatal(err)
    }
    defer jsonFile.Close()

    err = json.NewDecoder(jsonFile).Decode(&slugToFileMap)
    if err != nil {
        log.Fatal(err)
    }
}