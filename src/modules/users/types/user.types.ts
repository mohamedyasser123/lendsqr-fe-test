export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: number | string;
  createdAt: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";

  profile: {
    fullName: string;
    phoneNumber: number | string;
    email: string;
    bvn: number | string;
    gender: string;
    maritalStatus: string;
    children: number | string;
    residenceType: string;
  };

  education: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: number[];
    loanRepayment: number | string;
  };

  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };

  guarantor: {
    fullName: string;
    phoneNumber: number | string;
    email: string;
    relationship: string;
  };
}