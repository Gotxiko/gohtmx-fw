package middleware

import (
	"log"
	"net/http"
)

/*
// @desc    LoggingMiddleware logs the request method and URI
// @param   http.Handler
// @return  http.Handler
*/
func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Request received: %s %s", r.Method, r.RequestURI)
		next.ServeHTTP(w, r)
	})
}
