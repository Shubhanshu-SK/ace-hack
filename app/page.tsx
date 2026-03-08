"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AgentIcon, CustomerIcon, RDLogo } from "@/components/icons";

export default function LoginPage() {
  const router = useRouter();
  const [agentHover, setAgentHover] = useState(false);
  const [customerHover, setCustomerHover] = useState(false);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white font-sans">
      {/* Background illustration */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect fill='%23f5e6d3' width='1200' height='800'/%3E%3Ccircle cx='200' cy='300' r='80' fill='%23d4a574' opacity='0.3'/%3E%3Ccircle cx='400' cy='500' r='120' fill='%23c49a6c' opacity='0.2'/%3E%3Ccircle cx='800' cy='200' r='100' fill='%23b8956a' opacity='0.25'/%3E%3Ccircle cx='1000' cy='600' r='90' fill='%23d4a574' opacity='0.2'/%3E%3Cpath d='M600 100 L650 200 L550 200 Z' fill='%23732300' opacity='0.1'/%3E%3Cpath d='M100 600 L150 700 L50 700 Z' fill='%23732300' opacity='0.1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-0 px-4">
        {/* Logo */}
        <div className="mb-3.5">
          <RDLogo size={170} />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground mb-8 text-center tracking-tight">
          RD Sathi Portal mein aapka swagat hai
        </h1>

        {/* Buttons */}
        <div className="flex flex-col gap-3.5 w-full max-w-[380px]">
          <button
            className="flex items-center justify-center gap-2.5 text-white border-none rounded-md py-4 text-lg font-semibold cursor-pointer tracking-wide transition-colors"
            style={{
              backgroundColor: agentHover ? "#4a1010" : "#310C0C",
            }}
            onMouseEnter={() => setAgentHover(true)}
            onMouseLeave={() => setAgentHover(false)}
            onClick={() => router.push("/sign-in")}
          >
            <AgentIcon />
            Agent
          </button>
          <button
            className="flex items-center justify-center gap-2.5 text-white border-none rounded-md py-4 text-lg font-semibold cursor-pointer tracking-wide transition-colors"
            style={{
              backgroundColor: customerHover ? "#5a1a00" : "#732300",
            }}
            onMouseEnter={() => setCustomerHover(true)}
            onMouseLeave={() => setCustomerHover(false)}
            onClick={() => router.push("/customer-portal")}
          >
            <CustomerIcon />
            Customer
          </button>
        </div>
      </div>
    </div>
  );
}
