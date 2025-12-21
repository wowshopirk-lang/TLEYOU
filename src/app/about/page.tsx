import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutPage from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "О бренде TLEYOU — История и философия",
  description:
    "TLEYOU — бренд для женщин, которые устали быть сильными. Мы создаём пространство для возвращения к себе через тишину и заботу.",
};

export default function About() {
  return (
    <>
      <Header />
      <div className="pt-20">
        <AboutPage />
      </div>
      <Footer />
    </>
  );
}




