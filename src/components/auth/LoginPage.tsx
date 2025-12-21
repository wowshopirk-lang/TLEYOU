"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Logo from "@/components/ui/Logo";
import { motion } from "framer-motion";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement actual login with NextAuth
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Redirect to cabinet after login
    window.location.href = "/cabinet";
  };

  return (
    <section className="min-h-[80vh] flex items-center bg-[var(--color-cream)]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <div className="mb-6 flex justify-center">
              <Logo variant="dark" width={140} height={46} />
            </div>
            <h1 className="text-3xl font-heading font-light mb-2">
              Добро пожаловать
            </h1>
            <p className="text-[var(--color-stone)]">
              Войдите в личный кабинет
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />

              <Input
                label="Пароль"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-[var(--color-muted)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                  <span className="text-[var(--color-stone)]">Запомнить меня</span>
                </label>
                <Link
                  href="/auth/reset"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  Забыли пароль?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Вход..."
                ) : (
                  <>
                    Войти
                    <LogIn className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-[var(--color-stone)]">
              Нет аккаунта?{" "}
              <Link
                href="/auth/register"
                className="text-[var(--color-primary)] hover:underline font-medium"
              >
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

