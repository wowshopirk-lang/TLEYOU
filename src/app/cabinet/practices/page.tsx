"use client";

import { useSearchParams } from "next/navigation";
import CabinetPractices from "@/components/cabinet/CabinetPractices";
import PracticeDetail from "@/components/cabinet/PracticeDetail";

export default function Practices() {
  const searchParams = useSearchParams();
  const practiceId = searchParams.get("practice");

  // If practice ID is provided, show detail view
  if (practiceId) {
    return <PracticeDetail practiceId={practiceId} />;
  }

  // Otherwise show list view
  return <CabinetPractices />;
}
