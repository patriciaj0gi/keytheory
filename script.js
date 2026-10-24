const languageKey = "keytheory-language";
const languageToggle = document.querySelector("[data-language-toggle]");
const supportedLanguages = ["en", "et"];

if (languageToggle) {
  const savedLanguage = localStorage.getItem(languageKey);
  let language = supportedLanguages.includes(savedLanguage) ? savedLanguage : "en";

  const updateLanguage = () => {
    document.documentElement.lang = language;

    document.querySelectorAll("[data-en][data-et]").forEach((element) => {
      element.textContent = element.dataset[language];
    });

    document.querySelectorAll("[data-en-aria-label][data-et-aria-label]").forEach((element) => {
      element.setAttribute("aria-label", element.dataset[`${language}AriaLabel`]);
    });

    document.querySelectorAll("[data-en-alt][data-et-alt]").forEach((element) => {
      element.setAttribute("alt", element.dataset[`${language}Alt`]);
    });

    languageToggle.textContent = language === "en" ? "ET" : "EN";
    languageToggle.setAttribute("aria-pressed", String(language === "et"));
    languageToggle.setAttribute(
      "aria-label",
      language === "en" ? "Switch language to Estonian" : "Vaheta keeleks inglise keel",
    );
  };

  updateLanguage();

  languageToggle.addEventListener("click", () => {
    language = language === "en" ? "et" : "en";
    localStorage.setItem(languageKey, language);
    updateLanguage();
  });
}