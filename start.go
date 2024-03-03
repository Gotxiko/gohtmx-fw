package main

import (
	"gtz-main/server/routes"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	// Handle assets
	r.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", http.FileServer(http.Dir("dist/assets"))))

	// Handle partials
	r.HandleFunc("/partial/{name}", routes.PartialsHandler)

	// Handle routes with or without lang and slug
	r.HandleFunc("/{lang:[a-z]{2}}/{slug}{trailingslash:\\/?}", routes.WebsiteHandler)
	r.HandleFunc("/{lang:[a-z]{2}}{trailingslash:\\/?}", routes.WebsiteHandler)
	r.HandleFunc("/", routes.WebsiteHandler)

	http.ListenAndServe(":3000", r)
}
