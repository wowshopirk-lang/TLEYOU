"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Logo from "@/components/ui/Logo";
import { motion } from "framer-motion";
import Link from "next/link";
import { UserPlus, Check } from "lucide-react";

const benefits = [
  "7 дней бесплатного доступа",
  "Все 30 карточек с вопросами",
  "Ежедневные практики и медитации",
  "Отмена в любой момент",
];

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
    
    setIsLoading(true);
    
    // TODO: Implement actual registration with NextAuth
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Redirect to cabinet after registration
    window.location.href = "/cabinet";
  };

  return (
    <section className="section bg-[var(--color-cream)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <h2 className="text-3xl font-heading font-light mb-6">
              Начни путь к себе
            </h2>
            <p className="text-lg text-[var(--color-stone)] mb-8">
              Зарегистрируйся и получи 7 дней бесплатного доступа ко всем
              возможностям подписки.
            </p>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 p-6 bg-white rounded-xl">
              <p className="text-sm text-[var(--color-stone)] mb-2">
                После пробного периода
              </p>
              <p className="text-2xl font-heading font-medium text-[var(--color-primary)]">
                500 ₽/месяц
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-8 lg:hidden">
              <div className="mb-6 flex justify-center">
                <Logo variant="dark" width={140} height={46} />
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h1 className="text-2xl font-heading font-light mb-6 text-center lg:text-left">
                Создать аккаунт
              </h1>

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Имя"
                  type="text"
                  placeholder="Как к вам обращаться?"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />

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
                  placeholder="Минимум 8 символов"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />

                <Input
                  label="Подтвердите пароль"
                  type="password"
                  placeholder="Повторите пароль"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  required
                />

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 rounded border-[var(--color-muted)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                    required
                  />
                  <span className="text-sm text-[var(--color-stone)]">
                    Я согласна с{" "}
                    <Link href="/terms" className="text-[var(--color-primary)] underline">
                      условиями использования
                    </Link>{" "}
                    и{" "}
                    <Link href="/privacy" className="text-[var(--color-primary)] underline">
                      политикой конфиденциальности
                    </Link>
                  </span>
                </label>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isLoading || !agreedToTerms}
                >
                  {isLoading ? (
                    "Регистрация..."
                  ) : (
                    <>
                      Начать бесплатный период
                      <UserPlus className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-[var(--color-stone)]">
                Уже есть аккаунт?{" "}
                <Link
                  href="/auth/login"
                  className="text-[var(--color-primary)] hover:underline font-medium"
                >
                  Войти
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

