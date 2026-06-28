import React from 'react';

interface InfoFieldProps {
  label: string;
  value: string | number;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value }) => {
  return (
    <div className="info-field">
      <span className="info-field__label">{label}</span>
      <span className="info-field__value">{value != null && value !== '' ? value : 'N/A'}</span>
    </div>
  );
};

export default InfoField;
