export function getClientLocale(): "en" | "da" {
  if (typeof window === "undefined") return "en";
  
  // Check localStorage for user preference
  const stored = localStorage.getItem("wicare-locale");
  if (stored === "en" || stored === "da") return stored;
  
  // Check browser language
  const browserLang = navigator.language.split("-")[0];
  if (browserLang === "da") return "da";
  
  return "en";
}

export function getServerLocale(headers?: Headers): "en" | "da" {
  if (!headers) return "en";
  
  const geoCountry = headers.get("cf-ipcountry");
  if (geoCountry === "DK") return "da";
  
  const acceptLanguage = headers.get("accept-language");
  if (acceptLanguage?.startsWith("da")) return "da";
  
  return "en";
}
