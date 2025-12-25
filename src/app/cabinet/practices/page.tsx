"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CabinetPractices from "@/components/cabinet/CabinetPractices";
import PracticeDetail from "@/components/cabinet/PracticeDetail";

function PracticesContent() {
  const searchParams = useSearchParams();
  const practiceId = searchParams.get("practice");

  // If practice ID is provided, show detail view
  if (practiceId) {
    return <PracticeDetail practiceId={practiceId} />;
  }

  // Otherwise show list view
  return <CabinetPractices />;
}

export default function Practices() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="text-white/40">Загрузка...</div></div>}>
      <PracticesContent />
    </Suspense>
  );
}
