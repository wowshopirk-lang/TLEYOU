import { Metadata } from "next";
import CabinetTests from "@/components/cabinet/CabinetTests";

export const metadata: Metadata = {
  title: "Психологические тесты — TLEYOU",
  description: "Узнай себя лучше и получи персональные рекомендации",
};

export default function TestsPage() {
  return <CabinetTests />;
}

