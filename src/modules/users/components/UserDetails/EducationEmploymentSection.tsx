import React from 'react';
import InfoField from './InfoField';

interface EducationEmploymentData {
  level: string;
  employmentStatus: string;
  sector: string;
  duration: string;
  officeEmail: string;
  monthlyIncome: (number | string)[];
  loanRepayment: number | string;
}

interface EducationEmploymentSectionProps {
  data: EducationEmploymentData;
}

const EducationEmploymentSection: React.FC<EducationEmploymentSectionProps> = ({ data }) => {
  const incomeRange =
    data.monthlyIncome.length === 2
      ? `₦${Number(data.monthlyIncome[0]).toLocaleString()} - ₦${Number(data.monthlyIncome[1]).toLocaleString()}`
      : data.monthlyIncome[0] != null ? String(data.monthlyIncome[0]) : 'N/A';

  return (
    <section className="details-section">
      <h3 className="details-section__title">Education and Employment</h3>
      <div className="details-section__grid">
        <InfoField label="Level of Education" value={data.level} />
        <InfoField label="Employment Status" value={data.employmentStatus} />
        <InfoField label="Sector of Employment" value={data.sector} />
        <InfoField label="Duration of Employment" value={data.duration} />
        <InfoField label="Office Email" value={data.officeEmail} />
        <InfoField label="Monthly Income" value={incomeRange} />
        <InfoField label="Loan Repayment" value={data.loanRepayment} />
      </div>
    </section>
  );
};

export default EducationEmploymentSection;
