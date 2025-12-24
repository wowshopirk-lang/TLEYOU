import { Metadata } from "next";
import CabinetChat from "@/components/cabinet/CabinetChat";

export const metadata: Metadata = {
  title: "Чат поддержки — TLEYOU",
  description: "Твой заботливый AI-компаньон всегда рядом",
};

export default function ChatPage() {
  return <CabinetChat />;
}

