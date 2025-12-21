import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RegisterPage from "@/components/auth/RegisterPage";

export const metadata: Metadata = {
  title: "Регистрация — TLEYOU",
  description: "Создайте аккаунт TLEYOU и получите доступ к подписке",
};

export default function Register() {
  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24">
        <RegisterPage />
      </main>
      <Footer />
    </>
  );
}




