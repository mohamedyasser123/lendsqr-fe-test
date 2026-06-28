import React from 'react';
import InfoField from './InfoField';

interface SocialsData {
  twitter: string;
  facebook: string;
  instagram: string;
}

interface SocialsSectionProps {
  data: SocialsData;
}

const SocialsSection: React.FC<SocialsSectionProps> = ({ data }) => {
  return (
    <section className="details-section">
      <h3 className="details-section__title">Socials</h3>
      <div className="details-section__grid details-section__grid--three">
        <InfoField label="Twitter" value={data.twitter} />
        <InfoField label="Facebook" value={data.facebook} />
        <InfoField label="Instagram" value={data.instagram} />
      </div>
    </section>
  );
};

export default SocialsSection;
