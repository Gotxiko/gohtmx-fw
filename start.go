package main

import (
	"net/http"

	"gtz-main/server/routes"

	"github.com/gorilla/mux"
)

func main() {

	r := mux.NewRouter()
	r.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", http.FileServer(http.Dir("dist/assets"))))
	// r.HandleFunc("/", Homehandler)
	r.HandleFunc("/{lang}/{slug}", routes.WebsiteHandler)

	http.ListenAndServe(":3000", r)
}
