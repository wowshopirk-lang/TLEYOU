import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginPage from "@/components/auth/LoginPage";

export const metadata: Metadata = {
  title: "Вход — TLEYOU",
  description: "Войдите в личный кабинет TLEYOU",
};

export default function Login() {
  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24">
        <LoginPage />
      </main>
      <Footer />
    </>
  );
}




