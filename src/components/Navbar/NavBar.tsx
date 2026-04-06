import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { i18n } = useTranslation();

  const currentLang = i18n.language;

  const changeLanguage = (lang: "en" | "zh") => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-black text-white">
      {/* Logo */}
      <div className="text-xl font-bold">101jiyun</div>

      {/* Language Toggle */}
      <div className="flex items-center bg-gray-800 rounded-full p-1">
        <button
          onClick={() => changeLanguage("zh")}
          className={`px-3 py-1 rounded-full text-sm transition ${
            currentLang === "zh"
              ? "bg-white text-black"
              : "text-gray-300 hover:text-white"
          }`}
        >
          中文
        </button>

        <button
          onClick={() => changeLanguage("en")}
          className={`px-3 py-1 rounded-full text-sm transition ${
            currentLang === "en"
              ? "bg-white text-black"
              : "text-gray-300 hover:text-white"
          }`}
        >
          EN
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
