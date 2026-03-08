"use client";

import {
  CheckCircle2,
  Clock,
  TrendingUp,
  CalendarDays,
  Banknote,
  BadgeIndianRupee,
  ArrowDownCircle,
  Info,
} from "lucide-react";
import { rdAccount, formatCurrency } from "@/lib/data/rd-account";

const allInstallments = Array.from({ length: 28 }, (_, i) => ({
  no: i + 1,
  month: new Date(2026, i, 1).toLocaleString("en-IN", {
    month: "short",
    year: "numeric",
  }),
  date: new Date(2026, i, 1).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }),
  amount: 2000,
  status: i < 2 ? "Paid" : i === 2 ? "Due" : "Upcoming",
}));

export function MeriRDMonthly() {
  const progress =
    (rdAccount.paidInstallments / rdAccount.totalInstallments) * 100;

  return (
    <div className="space-y-6">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#732300]/10 flex items-center justify-center shrink-0">
            <Banknote className="w-6 h-6 text-[#732300]" />
          </div>
          <div>
            <p className="text-gray-500 text-xs">Monthly Installment</p>
            <p className="text-gray-900 text-xl font-semibold font-sans">
              {formatCurrency(rdAccount.monthlyAmount)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-xs">Jama Installments</p>
            <p className="text-gray-900 text-xl font-semibold font-sans">
              {rdAccount.paidInstallments} / {rdAccount.totalInstallments}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-xs">Interest Rate</p>
            <p className="text-gray-900 text-xl font-semibold font-sans">
              {rdAccount.interestRate}% p.a.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
            <BadgeIndianRupee className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-gray-500 text-xs">Maturity Amount</p>
            <p className="text-gray-900 text-xl font-semibold font-sans">
              {formatCurrency(rdAccount.maturityAmount)}
            </p>
          </div>
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account Details Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 col-span-1">
          <h2 className="text-base font-semibold text-gray-800 font-sans mb-4 flex items-center gap-2">
            <Info className="w-4 h-4 text-[#732300]" />
            Account ki Jaankari
          </h2>
          <div className="space-y-3">
            {[
              { label: "Account Number", value: rdAccount.accountNo },
              { label: "Bank", value: rdAccount.bank },
              { label: "Branch", value: rdAccount.branch },
              { label: "IFSC Code", value: rdAccount.ifsc },
              {
                label: "Shuruwat ki Tarikh",
                value: rdAccount.startDate.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }),
              },
              {
                label: "Maturity ki Tarikh",
                value: rdAccount.maturityDate.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }),
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-start border-b border-gray-50 pb-2"
              >
                <span className="text-gray-500 text-sm">{item.label}</span>
                <span className="text-gray-800 text-sm font-medium text-right max-w-[55%]">
                  {item.value}
                </span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-1">
              <span className="text-gray-500 text-sm">Status</span>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                {rdAccount.status}
              </span>
            </div>
          </div>
        </div>

        {/* Installment Progress */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 col-span-2">
          <h2 className="text-base font-semibold text-gray-800 font-sans mb-1 flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-[#732300]" />
            Installment Progress
          </h2>
          <p className="text-gray-400 text-xs mb-4">
            {rdAccount.paidInstallments} paid ·{" "}
            {rdAccount.totalInstallments - rdAccount.paidInstallments} baaki
          </p>

          <div className="w-full bg-gray-100 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-[#732300] to-[#a87762] h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="grid grid-cols-7 gap-2">
            {allInstallments.map((inst) => (
              <div
                key={inst.no}
                title={`${inst.month}: ${inst.status}`}
                className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs font-semibold cursor-default transition-all
                  ${
                    inst.status === "Paid"
                      ? "bg-[#732300] text-white shadow-sm"
                      : inst.status === "Due"
                        ? "bg-amber-400 text-white shadow-sm animate-pulse"
                        : "bg-gray-100 text-gray-400"
                  }`}
              >
                {inst.no}
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className="w-3 h-3 rounded bg-[#732300]" /> Jama (Paid)
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className="w-3 h-3 rounded bg-amber-400" /> Due Hai
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className="w-3 h-3 rounded bg-gray-100 border border-gray-200" />{" "}
              Baaki
            </div>
          </div>
        </div>
      </div>

      {/* Next Due & Payment History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-[#732300] to-[#a87762] rounded-xl shadow-sm p-6 text-white flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-white/80" />
            <h2 className="text-base font-semibold font-sans">
              Agla Installment
            </h2>
          </div>
          <div>
            <p className="text-white/70 text-sm">Due Date</p>
            <p className="text-2xl font-semibold">{rdAccount.nextDueDate}</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3 mt-1">
            <p className="text-white/80 text-xs mb-1">Bharna hai</p>
            <p className="text-2xl font-semibold">
              {formatCurrency(rdAccount.monthlyAmount)}
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-white/70 text-xs">Abhi tak jama</p>
            <p className="text-lg font-semibold">
              {formatCurrency(
                rdAccount.paidInstallments * rdAccount.monthlyAmount
              )}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 col-span-2">
          <h2 className="text-base font-semibold text-gray-800 font-sans mb-4 flex items-center gap-2">
            <ArrowDownCircle className="w-4 h-4 text-[#732300]" />
            Payment History
          </h2>
          <div className="overflow-auto max-h-64">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-gray-500 font-medium pb-2 pr-3">
                    #
                  </th>
                  <th className="text-left text-gray-500 font-medium pb-2 pr-3">
                    Mahina
                  </th>
                  <th className="text-left text-gray-500 font-medium pb-2 pr-3">
                    Tarikh
                  </th>
                  <th className="text-right text-gray-500 font-medium pb-2 pr-3">
                    Amount
                  </th>
                  <th className="text-center text-gray-500 font-medium pb-2">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {allInstallments.slice(0, 6).map((inst) => (
                  <tr
                    key={inst.no}
                    className="border-b border-gray-50 hover:bg-gray-50/50"
                  >
                    <td className="py-2.5 pr-3 text-gray-400">{inst.no}</td>
                    <td className="py-2.5 pr-3 text-gray-700">{inst.month}</td>
                    <td className="py-2.5 pr-3 text-gray-600">{inst.date}</td>
                    <td className="py-2.5 pr-3 text-right text-gray-800 font-medium">
                      {formatCurrency(inst.amount)}
                    </td>
                    <td className="py-2.5 text-center">
                      <span
                        className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full
                          ${
                            inst.status === "Paid"
                              ? "bg-green-100 text-green-700"
                              : inst.status === "Due"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-gray-100 text-gray-500"
                          }`}
                      >
                        {inst.status === "Paid"
                          ? "Jama"
                          : inst.status === "Due"
                            ? "Due Hai"
                            : "Baaki"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-xs mt-3 text-center">
            Showing first 6 of {rdAccount.totalInstallments} installments
          </p>
        </div>
      </div>
    </div>
  );
}
