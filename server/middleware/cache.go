package middleware

import "net/http"

/*
// @desc    CacheControl sets the Cache-Control header
// @param   http.Handler
// @return  http.Handler
*/
func CacheControl(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "public, max-age=31536000")
		next.ServeHTTP(w, r)
	})
}
