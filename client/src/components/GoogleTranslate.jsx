import { useEffect, useState } from "react";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "bn", label: "বাংলা (Bengali)" },
  { code: "gu", label: "ગુજરાતી (Gujarati)" },
  { code: "kn", label: "ಕನ್ನಡ (Kannada)" },
  { code: "ml", label: "മലയാളം (Malayalam)" },
  { code: "mr", label: "मराठी (Marathi)" },
  { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "ta", label: "தமிழ் (Tamil)" },
  { code: "te", label: "తెలుగు (Telugu)" },
  { code: "ur", label: "اردو (Urdu)" },
  { code: "or", label: "ଓଡ଼ିଆ (Odia)" },
  { code: "as", label: "অসমীয়া (Assamese)" },
];

const GoogleTranslate = () => {
  const [selectedLang, setSelectedLang] = useState(
    localStorage.getItem("selectedLang") || "en",
  );

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: languages.map((lang) => lang.code).join(","),
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const changeLanguage = (langCode) => {
    setSelectedLang(langCode);
    localStorage.setItem("selectedLang", langCode);

    const select = document.querySelector(".goog-te-combo");

    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div className="w-full notranslate" translate="no">
      {/* Hidden Google Translate Element */}
      <div
        id="google_translate_element"
        className="hidden notranslate"
        translate="no"
      ></div>

      {/* Custom Dropdown */}
      <select
        value={selectedLang}
        onChange={(e) => changeLanguage(e.target.value)}
        translate="no"
        className="notranslate w-full rounded-full border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-600 outline-none transition focus:border-orange-400"
      >
        {languages.map((lang) => (
          <option
            key={lang.code}
            value={lang.code}
            translate="no"
            className="notranslate"
          >
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GoogleTranslate;