import { Metadata } from "next";
import CabinetMood from "@/components/cabinet/CabinetMood";

export const metadata: Metadata = {
  title: "Трекер настроения — TLEYOU",
  description: "Отслеживай своё эмоциональное состояние",
};

export default function MoodPage() {
  return <CabinetMood />;
}

