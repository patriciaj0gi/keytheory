const languageKey = "keytheory-language";
const languageToggles = document.querySelectorAll("[data-language-toggle]");
const languageChoices = document.querySelectorAll("[data-language-choice]");
const supportedLanguages = ["en", "et"];
let updateSignupButtonLabel = () => {};

if (languageToggles.length > 0 || languageChoices.length > 0) {
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

    document.querySelectorAll("[data-en-placeholder][data-et-placeholder]").forEach((element) => {
      element.setAttribute("placeholder", element.dataset[`${language}Placeholder`]);
    });

    languageToggles.forEach((toggle) => {
      toggle.textContent = language === "en" ? "ET" : "EN";
      toggle.setAttribute("aria-pressed", String(language === "et"));
      toggle.setAttribute(
        "aria-label",
        language === "en" ? "Switch language to Estonian" : "Vaheta keeleks inglise keel",
      );
    });

    languageChoices.forEach((choice) => {
      choice.setAttribute("aria-pressed", String(choice.dataset.languageChoice === language));
    });
    updateSignupButtonLabel();
  };

  updateLanguage();

  const setLanguage = (nextLanguage) => {
    language = nextLanguage;
    localStorage.setItem(languageKey, language);
    updateLanguage();
  };

  languageToggles.forEach((toggle) => toggle.addEventListener("click", () => {
    language = language === "en" ? "et" : "en";
    setLanguage(language);
  }));

  languageChoices.forEach((choice) => {
    choice.addEventListener("click", () => setLanguage(choice.dataset.languageChoice));
  });
}

const signupForm = document.querySelector("[data-signup-form]");
const signupStatus = document.querySelector("[data-signup-status]");
const accountModeButtons = document.querySelectorAll("[data-account-mode]");

if (signupForm && signupStatus) {
  let accountMode = "signup";
  const passwordField = signupForm.querySelector("#signup-password");
  const submitButton = signupForm.querySelector(".signup-submit");
  updateSignupButtonLabel = () => {
    if (!(submitButton instanceof HTMLButtonElement)) return;
    const isEnglish = document.documentElement.lang === "en";
    submitButton.textContent = accountMode === "login"
      ? (isEnglish ? "Login" : "Logi sisse")
      : (isEnglish ? "Create Account" : "Loo konto");
  };

  accountModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      accountMode = button.dataset.accountMode;
      accountModeButtons.forEach((tab) => {
        const isSelected = tab === button;
        tab.classList.toggle("is-selected", isSelected);
        tab.setAttribute("aria-selected", String(isSelected));
      });

      if (passwordField instanceof HTMLInputElement) {
        passwordField.autocomplete = accountMode === "login" ? "current-password" : "new-password";
      }
      updateSignupButtonLabel();
      signupStatus.textContent = "";
    });
  });

  updateSignupButtonLabel();

  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    signupStatus.textContent = accountMode === "login"
      ? "Login is not connected yet."
      : "Account creation is not connected yet.";
  });

  signupForm.querySelector(".google-signin")?.addEventListener("click", () => {
    signupStatus.textContent = document.documentElement.lang === "en"
      ? "Google sign-in is not connected yet."
      : "Google'i sisselogimine pole veel ühendatud.";
  });
}