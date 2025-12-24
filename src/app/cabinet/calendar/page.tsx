import { Metadata } from "next";
import CabinetCalendar from "@/components/cabinet/CabinetCalendar";

export const metadata: Metadata = {
  title: "Календарь практик — TLEYOU",
  description: "Отслеживай свой прогресс и активность",
};

export default function CalendarPage() {
  return <CabinetCalendar />;
}

