export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";

  profile: {
    fullName: string;
    phoneNumber: string;
    email: string;
    bvn: string;
    gender: string;
    maritalStatus: string;
    children: string;
    residenceType: string;
  };

  education: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: string[];
    loanRepayment: string;
  };

  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };

  guarantor: {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  };
}