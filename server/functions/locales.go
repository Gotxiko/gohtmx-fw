package locales

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
)

type SlugMap map[string]string
type Langs map[string]interface{}

var langs map[string]Langs
var slugMap SlugMap

func init() {
	langs = make(map[string]Langs)
	files, err := os.ReadDir("src/locales")
	if err != nil {
		log.Fatal(err)
	}
	for _, file := range files {
		if file.IsDir() {
			lang := file.Name()
			langData, err := loadLangs(lang)
			if err != nil {
				panic(err)
			}
			langs[lang] = langData
		}
	}

	loadSlugMap()
}

func GetSlugMap() SlugMap {
	return slugMap
}

func GetLangs() map[string]Langs {
	return langs
}

func loadLangs(lang string) (Langs, error) {
	jsonFile, err := os.Open(fmt.Sprintf("src/locales/%s/langs.json", lang))
	if err != nil {
		return nil, err
	}
	defer jsonFile.Close()

	byteValue, err := io.ReadAll(jsonFile)
	if err != nil {
		return nil, err
	}

	var langs Langs

	json.Unmarshal(byteValue, &langs)

	return langs, nil
}

func loadSlugMap() {
	jsonFile, err := os.Open("src/locales/slugToFileMap.json")
	if err != nil {
		panic(err)
	}
	defer jsonFile.Close()

	byteValue, err := io.ReadAll(jsonFile)
	if err != nil {
		panic(err)
	}

	err = json.Unmarshal(byteValue, &slugMap)
	if err != nil {
		panic(err)
	}
}
