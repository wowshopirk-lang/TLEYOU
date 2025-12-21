import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HerbsPage from "@/components/pages/HerbsPage";

export const metadata: Metadata = {
  title: "Скрутки из трав — TLEYOU",
  description:
    "Травяные скрутки из лаванды, шалфея и полыни для ритуала тишины. Натуральные травы, безопасное тление.",
};

export default function Herbs() {
  return (
    <>
      <Header />
      <div className="pt-20 lg:pt-24">
        <HerbsPage />
      </div>
      <Footer />
    </>
  );
}

