"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  AgentIdIcon,
  EnvelopeIcon,
  LockIcon,
  EyeIcon,
  RDLogo,
} from "@/components/icons";

export default function SignInPage() {
  const router = useRouter();
  const [agentId, setAgentId] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginHover, setLoginHover] = useState(false);

  const handleLogin = () => {
    router.push("/dashboard");
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white font-sans flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage: `url('/assets/bg.png')`,
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

      {/* Card */}
      <div className="relative z-10 flex items-center justify-center w-full h-full px-4">
        <div className="bg-white rounded-xl p-9 w-full max-w-[440px] shadow-[0_4px_32px_rgba(0,0,0,0.10)] flex flex-col items-center">
          {/* Logo */}
          <div className="mb-3">
            <RDLogo size={72} />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-foreground mb-1.5 text-center tracking-tight">
            Apne account mein login karein
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-muted-foreground mb-5 text-center">
            Dobara swagat hai! Kripya apni details enter karein
          </p>

          {/* Agent ID Field */}
          <div className="w-full mb-3.5">
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              Agent ID
            </label>
            <div className="flex items-center border-[1.5px] border-border rounded-md px-3 bg-white h-11">
              <span className="flex items-center mr-2.5 shrink-0">
                <AgentIdIcon />
              </span>
              <input
                type="text"
                placeholder="Aapko diya gaya Agent ID yahan enter karein"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                className="flex-1 border-none outline-none text-sm text-foreground bg-transparent font-sans"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Minimum 3 characters required
            </p>
          </div>

          {/* Account Number Field */}
          <div className="w-full mb-3.5">
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              Account Number
            </label>
            <div className="flex items-center border-[1.5px] border-border rounded-md px-3 bg-white h-11">
              <span className="flex items-center mr-2.5 shrink-0">
                <EnvelopeIcon />
              </span>
              <input
                type={showAccount ? "text" : "password"}
                placeholder="Apna Account Number yahan daalein"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="flex-1 border-none outline-none text-sm text-foreground bg-transparent font-sans"
              />
              <button
                className="bg-transparent border-none cursor-pointer flex items-center p-0 ml-2 shrink-0"
                onClick={() => setShowAccount(!showAccount)}
                aria-label="Toggle account number visibility"
              >
                <EyeIcon show={showAccount} />
              </button>
            </div>
          </div>

          {/* Password Field */}
          <div className="w-full mb-3.5">
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              Password
            </label>
            <div className="flex items-center border-[1.5px] border-border rounded-md px-3 bg-white h-11">
              <span className="flex items-center mr-2.5 shrink-0">
                <LockIcon />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Apna password yahan daalein"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 border-none outline-none text-sm text-foreground bg-transparent font-sans"
              />
              <button
                className="bg-transparent border-none cursor-pointer flex items-center p-0 ml-2 shrink-0"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                <EyeIcon show={showPassword} />
              </button>
            </div>
          </div>

          {/* Remember me + Forgot Password */}
          <div className="flex items-center justify-between w-full mb-4 mt-0.5">
            <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 cursor-pointer accent-[#732300]"
              />
              Remember me
            </label>
            <button className="bg-transparent border-none cursor-pointer text-sm font-semibold text-[#732300] p-0">
              Forgot Password ?
            </button>
          </div>

          {/* Login Button */}
          <button
            className="w-full py-3.5 border-none rounded-md text-white text-base font-bold cursor-pointer tracking-wide transition-colors mb-4"
            style={{
              backgroundColor: loginHover ? "#5a1a00" : "#732300",
            }}
            onMouseEnter={() => setLoginHover(true)}
            onMouseLeave={() => setLoginHover(false)}
            onClick={handleLogin}
          >
            Login
          </button>

          {/* Sign Up link */}
          <p className="text-sm text-foreground text-center">
            Account nahi hai?{" "}
            <button
              className="bg-transparent border-none cursor-pointer text-sm font-bold text-foreground p-0 underline"
              onClick={() => router.push("/sign-up")}
            >
              Sign up karein
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
