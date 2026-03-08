"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { user, TODAY, getHeaderCounter } from "@/lib/data/rd-account";
import { RDLogo } from "@/components/icons";

const pageTitles: Record<string, string> = {
  "/dashboard": "Meri RD",
  "/dashboard/mera-page": "Mera Page",
  "/dashboard/agent-ki-jaankari": "Agent ki Jaankari",
};

const navLinks = [
  { to: "/dashboard/mera-page", label: "Mera Page" },
  { to: "/dashboard/agent-ki-jaankari", label: "Agent ki Jaankari" },
  { to: "/dashboard", label: "Meri RD" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentTitle = pageTitles[pathname] || "Meri RD";
  const headerCounter = getHeaderCounter();

  return (
    <div className="flex h-screen bg-[#f9fafb] overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative top-0 left-0 h-full z-40 w-64 bg-white shadow-[5px_5px_14px_0px_rgba(73,54,54,0.08)] flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="border-b border-black/10 px-4 py-4 flex items-center gap-3">
          <RDLogo size={38} />
          <span className="text-[#732300] font-semibold text-xl font-sans">
            RD Saathi
          </span>
          <button
            className="ml-auto lg:hidden text-gray-400 hover:text-gray-600"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 px-5 pt-9 flex-1">
          {navLinks.map((link) => {
            const isActive =
              link.to === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                href={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`h-12 flex items-center justify-center rounded-[5px] text-base transition-colors no-underline
                ${
                  isActive
                    ? "bg-[#732300] text-white"
                    : "text-black hover:bg-[#732300]/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-black/10 px-3 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#732300] flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-semibold">
              {user.initials}
            </span>
          </div>
          <span className="text-black text-sm font-semibold">{user.name}</span>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="relative bg-gradient-to-b from-[#732300] to-[#a87762] px-6 md:px-12 pt-10 pb-6 shrink-0">
          <div
            className="absolute inset-0 w-full h-full opacity-15 pointer-events-none bg-cover bg-center"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect fill='%23f5e6d3' width='1200' height='800'/%3E%3Ccircle cx='200' cy='300' r='80' fill='%23fff' opacity='0.1'/%3E%3Ccircle cx='800' cy='200' r='100' fill='%23fff' opacity='0.1'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Mobile hamburger */}
              <button
                className="lg:hidden text-white mr-1"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-white text-4xl font-medium font-sans">
                  Namaste,
                </h1>
                <p className="text-white/90 text-lg mt-0.5 font-sans">
                  {TODAY.toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-white text-2xl md:text-3xl font-sans">
                {headerCounter.value}
              </p>
              <p className="text-white/80 text-sm md:text-base font-sans">
                {headerCounter.label}
              </p>
            </div>
          </div>

          {/* Page title breadcrumb */}
          <div className="relative mt-4">
            <span className="text-white/70 text-sm font-sans">
              {currentTitle}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
