import React from 'react';
import PersonalInfoSection from './PersonalInfoSection';
import EducationEmploymentSection from './EducationEmploymentSection';
import SocialsSection from './SocialsSection';
import GuarantorSection from './GuarantorSection';
import type { User } from '../../types/user.types';

interface GeneralDetailsTabProps {
  user: User;
}

const GeneralDetailsTab: React.FC<GeneralDetailsTabProps> = ({ user }) => {
  return (
    <div
      id="tabpanel-general"
      role="tabpanel"
      aria-labelledby="tab-general"
      className="general-details-tab"
    >
      <PersonalInfoSection data={user.profile} />
      <div className="details-section__separator" />
      <EducationEmploymentSection data={user.education} />
      <div className="details-section__separator" />
      <SocialsSection data={user.socials} />
      <div className="details-section__separator" />
      <GuarantorSection guarantors={[user.guarantor]} />
    </div>
  );
};

export default GeneralDetailsTab;
