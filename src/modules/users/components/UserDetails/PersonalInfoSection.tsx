import React from 'react';
import InfoField from './InfoField';

interface PersonalInfoData {
  fullName: string;
  phoneNumber: number | string;
  email: string;
  bvn: number | string;
  gender: string;
  maritalStatus: string;
  children: number | string;
  residenceType: string;
}

interface PersonalInfoSectionProps {
  data: PersonalInfoData;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ data }) => {
  return (
    <section className="details-section">
      <h3 className="details-section__title">Personal Information</h3>
      <div className="details-section__grid">
        <InfoField label="Full Name" value={data.fullName} />
        <InfoField label="Phone Number" value={data.phoneNumber} />
        <InfoField label="Email Address" value={data.email} />
        <InfoField label="BVN" value={data.bvn} />
        <InfoField label="Gender" value={data.gender} />
        <InfoField label="Marital Status" value={data.maritalStatus} />
        <InfoField label="Children" value={data.children} />
        <InfoField label="Type of Residence" value={data.residenceType} />
      </div>
    </section>
  );
};

export default PersonalInfoSection;
