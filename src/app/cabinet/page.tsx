import { Metadata } from "next";
import CabinetDashboard from "@/components/cabinet/CabinetDashboard";

export const metadata: Metadata = {
  title: "Личный кабинет — TLEYOU",
  description: "Ваш личный кабинет TLEYOU",
};

export default function Cabinet(_props: Record<string, never>) {
  return <CabinetDashboard />;
}









