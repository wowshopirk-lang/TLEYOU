import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SubscriptionPage from "@/components/pages/SubscriptionPage";

export const metadata: Metadata = {
  title: "Подписка TLEYOU — Практики, медитации, карточки",
  description:
    "500 ₽/месяц за доступ к ежедневным практикам, медитациям, дыхательным техникам и всем 30 карточкам. Начни путь к себе.",
};

export default function Subscription() {
  return (
    <>
      <Header />
      <div className="pt-20 lg:pt-24">
        <SubscriptionPage />
      </div>
      <Footer />
    </>
  );
}




