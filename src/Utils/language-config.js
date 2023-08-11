import { srbCir, srbLat } from "content/language"

const languages = {
  "srb-cir": srbCir,
  "srb-lat": srbLat
};

export const getConfiguration = (languagePrefix) => {

    if (typeof languages[languagePrefix] !== "undefined") {
      return languages[languagePrefix]
    }
    return languages["srb-lat"]
  }