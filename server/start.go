package main

import (
	"gtz-main/server/middleware"
	"gtz-main/server/routes"
	"html/template"
	"net/http"
	"path/filepath"

	"github.com/gorilla/mux"
)

func main() {
	directories := []string{
		"public/views/pages",
		"public/views/components",
		"public/views/components/shared",
		"public/views/partials",
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

	r := mux.NewRouter()

	// Handle gzip compression
	r.Use(middleware.GzipMiddleware)

	// Handle assets
	r.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", http.FileServer(http.Dir("dist/assets"))))

	// Handle partials
	r.HandleFunc("/partial/{name}", routes.PartialsHandler)

	// Handle routes with or without lang and slug
	r.HandleFunc("/{lang:[a-z]{2}}/{slug}{trailingslash:\\/?}", routes.WebsiteHandler(tmpls))
	r.HandleFunc("/{lang:[a-z]{2}}{trailingslash:\\/?}", routes.WebsiteHandler(tmpls))
	r.HandleFunc("/", routes.WebsiteHandler(tmpls))

	http.ListenAndServe(":42069", r)
}
