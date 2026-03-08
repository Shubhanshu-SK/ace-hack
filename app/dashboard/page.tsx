"use client";

import { rdAccount } from "@/lib/data/rd-account";
import { MeriRDDaily } from "@/components/dashboard/meri-rd-daily";
import { MeriRDMonthly } from "@/components/dashboard/meri-rd-monthly";

export default function MeriRDPage() {
  if (rdAccount.type === "daily") {
    return <MeriRDDaily />;
  }
  return <MeriRDMonthly />;
}
