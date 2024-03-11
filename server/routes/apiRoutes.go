package routes

import (
	"net/http"

	"github.com/gorilla/mux"
)

func ApiHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	endpoint := vars["endpoint"]

	// Handle API routes
	switch endpoint {
	case "resource":
		switch r.Method {
		case http.MethodGet:
			// Handle GET request
			w.Header().Set("Content-Type", "application/json")
			w.Write([]byte(`{"message": "GET request received"}`))
		case http.MethodPost:
			// Handle POST request
			w.Header().Set("Content-Type", "application/json")
			w.Write([]byte(`{"message": "POST request received"}`))
		case http.MethodPut:
			// Handle PUT request
			w.Header().Set("Content-Type", "application/json")
			w.Write([]byte(`{"message": "PUT request received"}`))
		default:
			w.Header().Set("Content-Type", "application/json")
			w.Write([]byte(`{"message": "Invalid request method"}`))
		}
	default:
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"message": "API endpoint not found"}`))
	}
}
