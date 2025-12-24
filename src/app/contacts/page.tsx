import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactsPage from "@/components/pages/ContactsPage";

export const metadata: Metadata = {
  title: "Контакты TLEYOU",
  description:
    "Свяжитесь с нами через Telegram или email. Мы всегда рады ответить на ваши вопросы.",
};

export default function Contacts(_props: Record<string, never>) {
  return (
    <>
      <Header />
      <div className="pt-20 lg:pt-24">
        <ContactsPage />
      </div>
      <Footer />
    </>
  );
}
