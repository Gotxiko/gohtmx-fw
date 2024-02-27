package main

import (
	"gtz-main/server/middleware"
	"gtz-main/server/routes"
	"net/http"
)

func main() {

	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("dist/assets"))))

	http.Handle("/partials/", middleware.LoggingMiddleware(http.HandlerFunc(routes.HandlePartialRequest)))
	http.Handle("/", middleware.LoggingMiddleware(http.HandlerFunc(routes.HandleWebsiteRequest)))

	http.ListenAndServe(":3000", nil)
}
