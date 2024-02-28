package routes

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"
)

type SlugMap map[string]string
type Langs map[string]interface{}

var langs map[string]Langs

func init() {
    langs = make(map[string]Langs)
    for _, lang := range []string{"en", "es"} {
        langData, err := loadLangs(lang)
        if err != nil {
            panic(err)
        }
        langs[lang] = langData
    }
}

func WebsiteHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	lang := vars["lang"]
	slug := vars["slug"]
	w.WriteHeader(http.StatusOK)

	filename, err := getFilenameFromSlug(slug)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	tmpl, err := template.ParseFiles(filepath.Join("pages", filename + ".html"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	langData, ok := langs[lang][filename].(map[string]interface{})
	if !ok {
		http.Error(w, "Language or slug not found", http.StatusNotFound)
		return
	}

	err = tmpl.Execute(w, langData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func loadLangs(lang string) (Langs, error) {
    jsonFile, err := os.Open(fmt.Sprintf("locales/%s/langs.json", lang))
    if err != nil {
        return nil, err
    }
    defer jsonFile.Close()

    byteValue, err := io.ReadAll(jsonFile)
    if err != nil {
        return nil, err
    }

    var langs Langs
    json.Unmarshal(byteValue, &langs)

    return langs, nil
}

func getFilenameFromSlug(slug string) (string, error) {
    jsonFile, err := os.Open("locales/slugToFileMap.json")
    if err != nil {
        return "", err
    }
    defer jsonFile.Close()

    byteValue, err := io.ReadAll(jsonFile)
    if err != nil {
        return "", err
	}

    var slugMap SlugMap
    json.Unmarshal(byteValue, &slugMap)

    return slugMap[slug], nil
}
