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

	// Load .env file and variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	envs := make(map[string]string)
	for _, env := range os.Environ() {
		pair := strings.SplitN(env, "=", 2)
		envs[pair[0]] = pair[1]
	}

	directories := []string{
		"src/views/pages",
		"src/views/components",
		"src/views/components/base",
		"src/views/partials",
	}

	tmpls := template.New("")

	// Pre-parse all templates
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

	// Load locales in memory
	SlugMap := locales.GetSlugMap()
	Langs := locales.GetLangs()

	// Create router
	r := mux.NewRouter()

	// Use middleware
	gzip, exists := envs["GZIP"]
	if exists && gzip == "true" {
		r.Use(middleware.Gzip)
	}
	cache, exists := envs["CACHE"]
	if exists && cache == "true" {
		r.Use(middleware.CacheControl)
	}

	// Handle assets routes
	r.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", http.FileServer(http.Dir("dist/assets"))))
	r.PathPrefix("/favicon.ico").Handler(http.StripPrefix("/", http.FileServer(http.Dir("public"))))

	// Handle partials routes
	r.HandleFunc("/partial/{name}", routes.PartialsHandler(Langs))

	// Handle api routes
	r.HandleFunc("/api/{endpoint}", routes.ApiHandler)

	// Handle website routes with or without lang and slug
	r.HandleFunc("/{lang:[a-z]{2}}/{slug}{trailingslash:\\/?}", routes.WebsiteHandler(tmpls, envs["ENV"], SlugMap, Langs))
	r.HandleFunc("/{lang:[a-z]{2}}{trailingslash:\\/?}", routes.WebsiteHandler(tmpls, envs["ENV"], SlugMap, Langs))
	r.HandleFunc("/", routes.WebsiteHandler(tmpls, envs["ENV"], SlugMap, Langs))

	http.ListenAndServe(":42069", r)
}
