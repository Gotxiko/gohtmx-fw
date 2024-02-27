package main

import (
	"net/http"
	"gtz-main/server/middleware"
	"gtz-main/server/routes"
)

func main() {

    http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("dist/assets"))))

	http.Handle("/", middleware.LoggingMiddleware(http.HandlerFunc(websiteRoutes.HandleRequest)))

	http.ListenAndServe(":3000", nil)
}
