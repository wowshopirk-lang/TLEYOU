import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Публичная оферта — TLEYOU",
  description: "Условия продажи товаров и оказания услуг TLEYOU",
};

export default function Terms(_props: Record<string, never>) {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="section bg-[var(--color-background)]">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-heading font-light mb-8">
                Публичная оферта
              </h1>
              <div className="prose prose-lg max-w-none text-[var(--color-stone)]">
                <p className="text-sm text-[var(--color-stone)] mb-8">
                  Последнее обновление: {new Date().toLocaleDateString("ru-RU")}
                </p>

                <h2 className="text-2xl font-heading font-medium text-[var(--color-charcoal)] mt-8 mb-4">
                  1. Общие положения
                </h2>
                <p>
                  Настоящий документ является официальным предложением (офертой)
                  TLEYOU и содержит все существенные условия продажи товаров и
                  оказания услуг.
                </p>

                <h2 className="text-2xl font-heading font-medium text-[var(--color-charcoal)] mt-8 mb-4">
                  2. Предмет оферты
                </h2>
                <p>
                  Продавец предоставляет Покупателю возможность приобрести товары
                  (набор TLEYOU) и услуги (подписка на контент), представленные на
                  сайте.
                </p>

                <h2 className="text-2xl font-heading font-medium text-[var(--color-charcoal)] mt-8 mb-4">
                  3. Цены и оплата
                </h2>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Цены на товары указаны в рублях РФ</li>
                  <li>
                    Оплата производится через маркетплейс Ozon или по согласованию
                    с продавцом
                  </li>
                  <li>Подписка оплачивается ежемесячно</li>
                </ul>

                <h2 className="text-2xl font-heading font-medium text-[var(--color-charcoal)] mt-8 mb-4">
                  4. Доставка
                </h2>
                <p>
                  Доставка осуществляется через службы доставки маркетплейса Ozon
                  или иным способом по согласованию с покупателем.
                </p>

                <h2 className="text-2xl font-heading font-medium text-[var(--color-charcoal)] mt-8 mb-4">
                  5. Возврат и обмен
                </h2>
                <p>
                  Возврат товара надлежащего качества возможен в течение 14 дней с
                  момента получения при сохранении товарного вида и упаковки.
                </p>

                <h2 className="text-2xl font-heading font-medium text-[var(--color-charcoal)] mt-8 mb-4">
                  6. Подписка
                </h2>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Подписка оформляется на 1 месяц</li>
                  <li>Автоматическое продление при активной подписке</li>
                  <li>Отмена возможна в любой момент</li>
                  <li>
                    При отмене доступ сохраняется до конца оплаченного периода
                  </li>
                </ul>

                <h2 className="text-2xl font-heading font-medium text-[var(--color-charcoal)] mt-8 mb-4">
                  7. Контакты
                </h2>
                <p>
                  По всем вопросам обращайтесь:
                  <br />
                  Email: hello@tleyou.ru
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












