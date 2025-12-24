import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ResetPage from "@/components/auth/ResetPage";

export const metadata: Metadata = {
  title: "Сброс пароля — TLEYOU",
  description: "Восстановите доступ к аккаунту TLEYOU",
};

export default function Reset() {
  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24">
        <ResetPage />
      </main>
      <Footer />
    </>
  );
}





import Footer from "@/components/layout/Footer";
import ResetPage from "@/components/auth/ResetPage";

export const metadata: Metadata = {
  title: "Сброс пароля — TLEYOU",
  description: "Восстановите доступ к аккаунту TLEYOU",
};

export default function Reset() {
  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24">
        <ResetPage />
      </main>
      <Footer />
    </>
  );
}




