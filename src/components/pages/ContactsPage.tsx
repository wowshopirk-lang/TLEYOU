"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { motion } from "framer-motion";
import { Send, MessageCircle, Mail, Clock } from "lucide-react";

const contactMethods = [
  {
    icon: MessageCircle,
    title: "Telegram",
    description: "Самый быстрый способ связи",
    link: "https://t.me/tleyou",
    linkText: "@tleyou",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Для официальных запросов",
    link: "mailto:hello@tleyou.ru",
    linkText: "hello@tleyou.ru",
  },
  {
    icon: Clock,
    title: "Время ответа",
    description: "Обычно отвечаем в течение 24 часов",
    link: null,
    linkText: "Пн-Пт, 10:00-18:00",
  },
];

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <>
      {/* Hero */}
      <section className="section bg-[var(--color-cream)]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block text-sm uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
              Контакты
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light mb-8">
              Свяжитесь с нами
            </h1>
            <p className="text-xl text-[var(--color-stone)]">
              Есть вопросы? Хотите заказать со скидкой? Напишите нам!
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Methods */}
      <section className="section bg-[var(--color-background)]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-[var(--color-cream)] p-8 rounded-2xl text-center"
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-xl font-heading font-medium mb-2">
                    {method.title}
                  </h3>
                  <p className="text-[var(--color-stone)] text-sm mb-4">
                    {method.description}
                  </p>
                  {method.link ? (
                    <a
                      href={method.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-primary)] font-medium hover:underline"
                    >
                      {method.linkText}
                    </a>
                  ) : (
                    <span className="text-[var(--color-charcoal)] font-medium">
                      {method.linkText}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-heading font-medium mb-6 text-center">
                Заявка на скидку или вопрос
              </h2>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <Send className="w-8 h-8 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-xl font-heading font-medium mb-2">
                    Спасибо за сообщение!
                  </h3>
                  <p className="text-[var(--color-stone)]">
                    Мы ответим вам в ближайшее время.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Ваше имя"
                    type="text"
                    placeholder="Как к вам обращаться?"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />

                  <Input
                    label="Email или Telegram"
                    type="text"
                    placeholder="Как с вами связаться?"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Сообщение
                    </label>
                    <textarea
                      className="w-full px-4 py-3 rounded-lg border border-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-colors resize-none"
                      rows={5}
                      placeholder="Хочу заказать набор со скидкой / У меня есть вопрос..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Отправка..." : "Отправить"}
                  </Button>

                  <p className="text-xs text-center text-[var(--color-stone)]">
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <a href="/privacy" className="underline">
                      политикой конфиденциальности
                    </a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}




