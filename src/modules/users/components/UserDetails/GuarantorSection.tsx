import React from 'react';
import InfoField from './InfoField';

interface GuarantorData {
  fullName: string;
  phoneNumber: number | string;
  email: string;
  relationship: string;
}

interface GuarantorSectionProps {
  guarantors: GuarantorData[];
}

const GuarantorSection: React.FC<GuarantorSectionProps> = ({ guarantors }) => {
  return (
    <section className="details-section details-section--last">
      <h3 className="details-section__title">Guarantor</h3>
      {guarantors.map((guarantor, index) => (
        <div
          key={`guarantor-${index}`}
          className={`details-section__grid ${
            index < guarantors.length - 1 ? 'details-section__grid--mb' : ''
          }`}
        >
          <InfoField label="Full Name" value={guarantor.fullName} />
          <InfoField label="Phone Number" value={guarantor.phoneNumber} />
          <InfoField label="Email Address" value={guarantor.email} />
          <InfoField label="Relationship" value={guarantor.relationship} />
        </div>
      ))}
    </section>
  );
};

export default GuarantorSection;
