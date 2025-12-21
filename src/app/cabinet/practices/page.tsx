import { Metadata } from "next";
import CabinetPractices from "@/components/cabinet/CabinetPractices";

export const metadata: Metadata = {
  title: "Практики — TLEYOU",
  description: "Ежедневные практики для расслабления и самопознания",
};

export default function Practices() {
  return <CabinetPractices />;
}




