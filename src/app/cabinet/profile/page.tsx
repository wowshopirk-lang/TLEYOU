import { Metadata } from "next";
import CabinetProfile from "@/components/cabinet/CabinetProfile";

export const metadata: Metadata = {
  title: "Профиль — TLEYOU",
  description: "Настройки профиля и подписки",
};

export default function Profile(_props: Record<string, never>) {
  return <CabinetProfile />;
}












