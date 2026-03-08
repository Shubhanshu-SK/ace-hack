// ─────────────────────────────────────────────────────────────────────────────
// RD Account data — set by the agent when creating the account.
// "type" decides which Meri-RD view the customer sees:
//   "daily"   → agent comes every day for collection
//   "monthly" → agent comes once a month
// ─────────────────────────────────────────────────────────────────────────────

export const rdAccount = {
  // ── Common fields ──────────────────────────────────────────────────────────
  type: "daily" as "daily" | "monthly",
  accountNo: "RD-DAILY-2026-0089",
  bank: "Punjab National Bank",
  branch: "Jaipur – Sindhi Camp Branch",
  ifsc: "PUNB0123400",
  interestRate: 7.0,
  status: "Active" as const,

  // ── Daily-RD specific fields ───────────────────────────────────────────────
  dailyAmount: 100,
  totalDays: 365,
  startDate: new Date(2026, 0, 15),      // 15 Jan 2026
  maturityDate: new Date(2027, 0, 14),   // 14 Jan 2027
  maturityAmount: 38690,

  // Days when the agent did NOT collect (agent missed or customer was absent)
  // Format: "YYYY-MM-DD"
  missedDays: [
    "2026-01-22",
    "2026-02-10",
    "2026-02-20",
    "2026-03-03",
  ],

  // ── Monthly-RD specific fields ─────────────────────────────────────────────
  monthlyAmount: 2000,
  totalInstallments: 28,
  paidInstallments: 2,
  nextDueDate: "1 March 2026",

  // ── Agent info ─────────────────────────────────────────────────────────────
  agent: {
    name: "Ramesh Kumar Sharma",
    initials: "RK",
    phone: "+91 99887 76655",
    collectionTime: "Subah 9 – 11 baje",
    agencyName: "Sharma Financial Services",
  },
};

// "Today" is pinned to March 7 2026 so the demo looks real.
// Replace with:  export const TODAY = new Date();
export const TODAY = new Date(2026, 2, 7);

// ── User data ────────────────────────────────────────────────────────────────
export const user = {
  name: "Jyoti Devi",
  initials: "JD",
};

// ── Customer data ────────────────────────────────────────────────────────────
export const customerData = {
  name: "Jyoti Devi",
  initials: "JD",
  phone: "+91 98765 43210",
  altPhone: "+91 91234 56789",
  email: "jyoti.devi@gmail.com",
  address: "12, Shanti Nagar, Civil Lines, Jaipur – 302006, Rajasthan",
  dob: "15 August 1985",
  gender: "Mahila (Female)",
  occupation: "Grihini (Homemaker)",
  aadhar: "XXXX XXXX 4321",
  pan: "ABCDE1234F",
  kycStatus: "Verified",
  bankName: "State Bank of India",
  bankBranch: "Jaipur – Civil Lines",
  accountNo: "XXXX XXXX 6789",
  ifsc: "SBIN0001234",
  nomineeNname: "Ramesh Kumar",
  nomineeRelation: "Pati (Husband)",
};

// ── Agent profile data ───────────────────────────────────────────────────────
export const agentData = {
  name: "Ramesh Kumar Sharma",
  initials: "RK",
  designation: "Senior RD Agent",
  agencyName: "Sharma Financial Services",
  agencyCode: "SFS-JRP-2019",
  phone: "+91 99887 76655",
  altPhone: "+91 98123 45678",
  email: "ramesh.sharma@sfs.in",
  address: "Shop No. 5, Agrasen Market, MI Road, Jaipur – 302001",
  licenseNo: "RAJ/RDA/2019/04521",
  experience: "7 Saal",
  rating: 4.8,
  totalClients: 148,
  activeRDs: 132,
  joinedDate: "March 2019",
  officeHours: "Somvar – Shanivar, 9am – 6pm",
  specialization: "Recurring Deposit, Fixed Deposit",
};

// ── Helpers ──────────────────────────────────────────────────────────────────
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

// Compute header counter depending on account type
export function getHeaderCounter() {
  const missedSet = new Set(rdAccount.missedDays);
  
  if (rdAccount.type === "daily") {
    let collected = 0;
    const cursor = new Date(rdAccount.startDate);
    const todayKey = formatDateKey(TODAY);
    
    while (formatDateKey(cursor) < todayKey) {
      const k = formatDateKey(cursor);
      if (!missedSet.has(k)) collected++;
      cursor.setDate(cursor.getDate() + 1);
    }
    return { value: `${collected} / ${rdAccount.totalDays}`, label: "din jama" };
  }
  
  return {
    value: `${rdAccount.paidInstallments} / ${rdAccount.totalInstallments}`,
    label: "installment jama",
  };
}
