package routes

import (
	"encoding/json"
	"html/template"
	"io/ioutil"
	"net/http"
	"path/filepath"
	"strings"
)

func HandleWebsiteRequest(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path

	if strings.HasSuffix(path, "/") {
		if strings.HasPrefix(path, "/es/") {
			path = path + "inicio"
		} else if strings.HasPrefix(path, "/en/") {
			path = path + "index"
		} else {
			path = "/es" + path + "inicio"
		}
	}

	file, err := ioutil.ReadFile("data" + path + ".json")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var data map[string]interface{}
	err = json.Unmarshal(file, &data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	tmpl, err := template.ParseFiles(filepath.Join("pages", path+".html"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = tmpl.Execute(w, data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
