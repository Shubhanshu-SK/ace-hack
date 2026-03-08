"use client";

import {
  Phone,
  MapPin,
  Mail,
  Star,
  Users,
  Award,
  Briefcase,
  MessageCircle,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { agentData } from "@/lib/data/rd-account";

function StatCard({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${color}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xl font-semibold text-gray-900 font-sans">{value}</p>
        <p className="text-gray-500 text-xs">{label}</p>
      </div>
    </div>
  );
}

export default function AgentKiJaankariPage() {
  return (
    <div className="space-y-6">
      {/* Agent Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#732300] to-[#a87762] flex items-center justify-center shadow-md shrink-0">
            <span className="text-white text-3xl font-bold font-sans">
              {agentData.initials}
            </span>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-900 font-sans">
                {agentData.name}
              </h1>
              <span className="bg-[#732300]/10 text-[#732300] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {agentData.designation}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">{agentData.agencyName}</p>
            <div className="flex items-center gap-1.5 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(agentData.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-gray-700 text-sm font-semibold ml-1">
                {agentData.rating}
              </span>
              <span className="text-gray-400 text-xs ml-1">/ 5.0</span>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="flex gap-2 flex-wrap">
            <a
              href={`tel:${agentData.phone}`}
              className="flex items-center gap-1.5 bg-[#732300] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#5a1a00] transition-colors no-underline"
            >
              <Phone className="w-4 h-4" />
              Call Karen
            </a>
            <a
              href={`https://wa.me/${agentData.phone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors no-underline"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          value={`${agentData.totalClients}+`}
          label="Total Clients"
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          icon={TrendingUp}
          value={`${agentData.activeRDs}`}
          label="Active RDs"
          color="bg-green-100 text-green-600"
        />
        <StatCard
          icon={Award}
          value={agentData.experience}
          label="Experience"
          color="bg-amber-100 text-amber-600"
        />
        <StatCard
          icon={Star}
          value={`${agentData.rating}/5`}
          label="Customer Rating"
          color="bg-[#732300]/10 text-[#732300]"
        />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-800 font-sans mb-4 flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#732300]" />
            Sampark Karo
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-4 h-4 text-[#732300] shrink-0" />
              <div>
                <p className="text-gray-500 text-xs">Mobile</p>
                <p className="text-gray-800 text-sm font-medium">
                  {agentData.phone}
                </p>
              </div>
              <a
                href={`tel:${agentData.phone}`}
                className="ml-auto text-[#732300] hover:bg-[#732300]/10 p-1.5 rounded-lg transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-4 h-4 text-gray-400 shrink-0" />
              <div>
                <p className="text-gray-500 text-xs">Alt. Mobile</p>
                <p className="text-gray-800 text-sm font-medium">
                  {agentData.altPhone}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-4 h-4 text-[#732300] shrink-0" />
              <div>
                <p className="text-gray-500 text-xs">Email</p>
                <p className="text-gray-800 text-sm font-medium">
                  {agentData.email}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-4 h-4 text-[#732300] shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-500 text-xs">Office Pata</p>
                <p className="text-gray-800 text-sm font-medium">
                  {agentData.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Agency Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-800 font-sans mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#732300]" />
            Agency ki Jaankari
          </h2>
          <div className="space-y-2.5">
            {[
              { label: "Agency ka Naam", value: agentData.agencyName },
              { label: "Agency Code", value: agentData.agencyCode },
              { label: "License Number", value: agentData.licenseNo },
              { label: "Joined", value: agentData.joinedDate },
              { label: "Office Hours", value: agentData.officeHours },
              { label: "Specialization", value: agentData.specialization },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-start border-b border-gray-50 pb-2.5 last:border-0"
              >
                <span className="text-gray-500 text-sm">{item.label}</span>
                <span className="text-gray-800 text-sm font-medium text-right max-w-[55%]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Helpful Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
          <MessageCircle className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <p className="text-amber-800 font-semibold text-sm">
            Agent se Baat Karo
          </p>
          <p className="text-amber-700 text-sm mt-1">
            Koi bhi sawaal ho RD ke baare mein — installment, maturity, ya koi
            pareshani — seedha apne agent{" "}
            <span className="font-semibold">{agentData.name}</span> se sampark
            karo.{" "}
            <a
              href={`tel:${agentData.phone}`}
              className="underline font-semibold"
            >
              Abhi call karo
            </a>{" "}
            ya WhatsApp karo.
          </p>
        </div>
      </div>
    </div>
  );
}
