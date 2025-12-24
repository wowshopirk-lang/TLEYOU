import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — TLEYOU",
  description: "Политика обработки персональных данных TLEYOU",
};

export default function Privacy(_props: Record<string, never>) {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="section bg-[var(--color-background)]">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-heading font-light mb-8">
                Политика конфиденциальности
              </h1>
              <div className="prose prose-lg max-w-none text-[var(--color-stone)]">
                <p className="text-sm text-[var(--color-stone)] mb-8">
                  Последнее обновление: {new Date().toLocaleDateString("ru-RU")}
                </p>

                <h2 className="text-2xl font-heading font-medium text-[var(--color-charcoal)] mt-8 mb-4">
                  1. Общие положения
                </h2>
                <p>
                  Настоящая Политика конфиденциальности определяет порядок обработки
                  и защиты персональных данных пользователей сайта TLEYOU.
                </p>

                <h2 className="text-2xl font-heading font-medium text-[var(--color-charcoal)] mt-8 mb-4">
                  2. Какие данные мы собираем
                </h2>
                <p>Мы можем собирать следующую информацию:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Имя и контактные данные (email, телефон)</li>
                  <li>Данные об использовании сайта (cookies)</li>
                  <li>Информация о заказах и подписках</li>
                </ul>

                <h2 className="text-2xl font-heading font-medium text-[var(--color-charcoal)] mt-8 mb-4">
                  3. Как мы используем данные
                </h2>
                <p>Собранные данные используются для:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Обработки заказов и предоставления услуг</li>
                  <li>Связи с вами по вопросам заказов</li>
                  <li>Улучшения качества сервиса</li>
                  <li>Отправки информационных материалов (с вашего согласия)</li>
                </ul>

                <h2 className="text-2xl font-heading font-medium text-[var(--color-charcoal)] mt-8 mb-4">
                  4. Защита данных
                </h2>
                <p>
                  Мы принимаем все необходимые меры для защиты ваших персональных
                  данных от несанкционированного доступа, изменения или уничтожения.
                </p>

                <h2 className="text-2xl font-heading font-medium text-[var(--color-charcoal)] mt-8 mb-4">
                  5. Ваши права
                </h2>
                <p>Вы имеете право:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Запросить доступ к своим данным</li>
                  <li>Потребовать исправления неточных данных</li>
                  <li>Потребовать удаления данных</li>
                  <li>Отозвать согласие на обработку данных</li>
                </ul>

                <h2 className="text-2xl font-heading font-medium text-[var(--color-charcoal)] mt-8 mb-4">
                  6. Контакты
                </h2>
                <p>
                  По вопросам обработки персональных данных обращайтесь:
                  <br />
                  Email: privacy@tleyou.ru
                  <br />
                  Telegram: @tleyouself
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}












