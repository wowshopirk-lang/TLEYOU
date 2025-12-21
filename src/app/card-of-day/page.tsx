import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CardOfDayPage from "@/components/pages/CardOfDayPage";

export const metadata: Metadata = {
  title: "Карточка дня — TLEYOU",
  description:
    "Получи бесплатную карточку с вопросом для самопознания. Одна карточка в день — начни путь к себе.",
};

export default function CardOfDay() {
  return (
    <>
      <Header />
      <div className="pt-20 lg:pt-24">
        <CardOfDayPage />
      </div>
      <Footer />
    </>
  );
}




