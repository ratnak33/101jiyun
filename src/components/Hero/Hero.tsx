import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full h-[90vh] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6">
      <div className="max-w-4xl text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          {t("hero.title")}
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          {t("hero.subtitle")}
        </p>

        {/* CTA */}
        <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
          {t("hero.cta")}
        </button>
      </div>
    </section>
  );
};

export default Hero;
