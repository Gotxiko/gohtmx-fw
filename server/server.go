package main

import (
	"gtz-main/server/functions/locales"
	"gtz-main/server/middleware"
	"gtz-main/server/routes"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	ENV := strings.ToLower(os.Getenv("ENV"))

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

	SlugMap := locales.GetSlugMap()
	Langs := locales.GetLangs()

	r := mux.NewRouter()

	// Handle gzip compression
	r.Use(middleware.Gzip)

	// Use cache control
	r.Use(middleware.CacheControl)

	// Handle assets
	r.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", http.FileServer(http.Dir("dist/assets"))))
	r.PathPrefix("/favicon.ico").Handler(http.StripPrefix("/", http.FileServer(http.Dir("public"))))

	// Handle partials
	r.HandleFunc("/partial/{name}", routes.PartialsHandler(Langs))

	// Handle api routes
	r.HandleFunc("/api/{endpoint}", routes.ApiHandler)

	// Handle routes with or without lang and slug
	r.HandleFunc("/{lang:[a-z]{2}}/{slug}{trailingslash:\\/?}", routes.WebsiteHandler(tmpls, ENV, SlugMap, Langs))
	r.HandleFunc("/{lang:[a-z]{2}}{trailingslash:\\/?}", routes.WebsiteHandler(tmpls, ENV, SlugMap, Langs))
	r.HandleFunc("/", routes.WebsiteHandler(tmpls, ENV, SlugMap, Langs))

	http.ListenAndServe(":42069", r)
}
