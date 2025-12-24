import { Metadata } from "next";
import CabinetJournal from "@/components/cabinet/CabinetJournal";

export const metadata: Metadata = {
  title: "Дневник эмоций — TLEYOU",
  description: "Записывай свои мысли и чувства каждый день",
};

export default function JournalPage() {
  return <CabinetJournal />;
}

