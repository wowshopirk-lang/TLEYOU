"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Logo from "@/components/ui/Logo";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowLeft, Check } from "lucide-react";

export default function ResetPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement actual password reset
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
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
              Сброс пароля
            </h1>
            <p className="text-[var(--color-stone)]">
              Введите email для восстановления доступа
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            {isSubmitted ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <Check className="w-8 h-8 text-[var(--color-primary)]" />
                </div>
                <h2 className="text-xl font-heading font-medium mb-2">
                  Проверьте почту
                </h2>
                <p className="text-[var(--color-stone)] mb-6">
                  Мы отправили инструкции по восстановлению пароля на{" "}
                  <strong>{email}</strong>
                </p>
                <Link href="/auth/login">
                  <Button variant="secondary" size="lg" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Вернуться ко входу
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Отправка..."
                  ) : (
                    <>
                      Отправить инструкции
                      <Mail className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-2 text-sm text-[var(--color-stone)] hover:text-[var(--color-primary)]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Вернуться ко входу
                  </Link>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

