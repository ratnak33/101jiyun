import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t("services.air.title"),
      desc: t("services.air.desc")
    },
    {
      title: t("services.sea.title"),
      desc: t("services.sea.desc")
    },
    {
      title: t("services.express.title"),
      desc: t("services.express.desc")
    },
    {
      title: t("services.warehouse.title"),
      desc: t("services.warehouse.desc")
    }
  ];

  return (
    <section className="bg-white text-black py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          {t("services.title")}
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 border rounded-xl shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
