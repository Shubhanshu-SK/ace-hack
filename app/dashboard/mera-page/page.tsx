"use client";

import {
  User,
  Phone,
  MapPin,
  Mail,
  ShieldCheck,
  CreditCard,
  Edit3,
} from "lucide-react";
import { customerData } from "@/lib/data/rd-account";

function InfoRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between items-start py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-gray-500 text-sm">{label}</span>
      <span
        className={`text-sm font-medium text-right max-w-[60%] ${
          highlight ? "text-green-600" : "text-gray-800"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function MeraPage() {
  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#732300] to-[#a87762] flex items-center justify-center shadow-md shrink-0">
            <span className="text-white text-3xl font-bold font-sans">
              {customerData.initials}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900 font-sans">
              {customerData.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-500 text-sm">{customerData.phone}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              <span className="text-green-600 text-sm font-medium">
                KYC {customerData.kycStatus}
              </span>
            </div>
          </div>
          {/* <button className="flex items-center gap-1.5 text-[#732300] border border-[#732300]/30 rounded-lg px-3 py-2 text-sm hover:bg-[#732300]/5 transition-colors">
            <Edit3 className="w-3.5 h-3.5" />
            Edit
          </button> */}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-800 font-sans mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-[#732300]" />
            Personal Details
          </h2>
          <div>
            <InfoRow label="Poora Naam" value={customerData.name} />
            <InfoRow label="Janm Tithi (DOB)" value={customerData.dob} />
            <InfoRow label="Ling (Gender)" value={customerData.gender} />
            <InfoRow label="Peshaa (Occupation)" value={customerData.occupation} />
            <InfoRow label="Nominee ka Naam" value={customerData.nomineeNname} />
            <InfoRow label="Nominee ka Rishta" value={customerData.nomineeRelation} />
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-800 font-sans mb-4 flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#732300]" />
            Sampark Jaankari
          </h2>
          <div>
            <InfoRow label="Mobile Number" value={customerData.phone} />
            <InfoRow label="Alt. Mobile" value={customerData.altPhone} />
            <InfoRow label="Email" value={customerData.email} />
          </div>
          <div className="mt-3 flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#732300] shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-500 text-sm">Pata (Address)</p>
              <p className="text-gray-800 text-sm font-medium mt-0.5">
                {customerData.address}
              </p>
            </div>
          </div>
        </div>

        {/* KYC Documents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-800 font-sans mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#732300]" />
            KYC Documents
          </h2>
          <div>
            <InfoRow label="Aadhar Number" value={customerData.aadhar} />
            <InfoRow label="PAN Number" value={customerData.pan} />
            <InfoRow label="KYC Status" value={customerData.kycStatus} highlight />
          </div>
          <div className="mt-4 bg-green-50 rounded-lg p-3 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
            <div>
              <p className="text-green-700 text-sm font-semibold">
                KYC Poori Ho Gayi
              </p>
              <p className="text-green-600 text-xs">
                Aapki identity verify ho chuki hai.
              </p>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-800 font-sans mb-4 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#732300]" />
            Bank ki Jaankari
          </h2>
          <div>
            <InfoRow label="Bank ka Naam" value={customerData.bankName} />
            <InfoRow label="Branch" value={customerData.bankBranch} />
            <InfoRow label="Account Number" value={customerData.accountNo} />
            <InfoRow label="IFSC Code" value={customerData.ifsc} />
          </div>
          <div className="mt-4 bg-[#732300]/5 rounded-lg p-3 flex items-center gap-3">
            <Mail className="w-5 h-5 text-[#732300] shrink-0" />
            <div>
              <p className="text-[#732300] text-sm font-semibold">Email Linked</p>
              <p className="text-[#732300]/70 text-xs">{customerData.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
