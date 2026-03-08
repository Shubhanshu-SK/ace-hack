"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, RDLogo } from "@/components/icons";

export default function CustomerPortalLogin() {
  const router = useRouter();
  const [loginHover, setLoginHover] = useState(false);
  const [signupHover, setSignupHover] = useState(false);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white font-sans">
      {/* Background illustration */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect fill='%23f5e6d3' width='1200' height='800'/%3E%3Ccircle cx='200' cy='300' r='80' fill='%23d4a574' opacity='0.3'/%3E%3Ccircle cx='400' cy='500' r='120' fill='%23c49a6c' opacity='0.2'/%3E%3Ccircle cx='800' cy='200' r='100' fill='%23b8956a' opacity='0.25'/%3E%3Ccircle cx='1000' cy='600' r='90' fill='%23d4a574' opacity='0.2'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Back button */}
      <button
        className="absolute top-4 left-4 bg-transparent border-none cursor-pointer p-1 flex items-center justify-center z-10"
        onClick={() => router.back()}
        aria-label="Go back"
      >
        <ArrowLeftIcon />
      </button>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo */}
        <div className="mb-3.5">
          <RDLogo size={200} />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground mb-2 text-center tracking-tight">
          Customer Portal mein aapka swagat hai
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-muted-foreground mb-7 text-center">
          Aage badhne ke liye login ya signup karein
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-1 w-full max-w-[380px]">
          <button
            className="flex items-center justify-center text-white border-none rounded-md py-4 text-lg font-semibold cursor-pointer tracking-wide transition-colors"
            style={{
              backgroundColor: loginHover ? "#5a1a00" : "#732300",
            }}
            onMouseEnter={() => setLoginHover(true)}
            onMouseLeave={() => setLoginHover(false)}
            onClick={() => router.push("/sign-in")}
          >
            Login
          </button>

          <button
            className="flex items-center justify-center bg-transparent border-none rounded-md py-4 text-base font-medium cursor-pointer tracking-wide transition-colors"
            style={{
              color: signupHover ? "#5a1a00" : "#09121F",
            }}
            onMouseEnter={() => setSignupHover(true)}
            onMouseLeave={() => setSignupHover(false)}
            onClick={() => router.push("/sign-up")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
