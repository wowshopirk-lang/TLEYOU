import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductPage from "@/components/pages/ProductPage";

export const metadata: Metadata = {
  title: "Набор TLEYOU — Ритуал возвращения к себе",
  description:
    "Керамическая подставка, травяная скрутка и 30 карточек с вопросами. Всё для ежедневного ритуала самопознания. Цена 3 990 ₽.",
};

export default function Product() {
  return (
    <>
      <Header />
      <div className="pt-20 lg:pt-24">
        <ProductPage />
      </div>
      <Footer />
    </>
  );
}




