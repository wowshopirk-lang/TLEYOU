import { Metadata } from "next";
import CabinetCards from "@/components/cabinet/CabinetCards";

export const metadata: Metadata = {
  title: "Карточки — TLEYOU",
  description: "Все 30 карточек с вопросами для самопознания",
};

export default function Cards(_props: Record<string, never>) {
  return <CabinetCards />;
}












