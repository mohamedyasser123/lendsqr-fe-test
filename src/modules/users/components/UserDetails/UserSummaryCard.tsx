import React from 'react';
import { StarFilledIcon, StarEmptyIcon } from '../icons';

interface UserSummaryCardProps {
  fullName: string;
  userId: string;
  tier: number;
  accountBalance: string;
  bankDetails: string;
  avatarUrl?: string;
}

const UserSummaryCard: React.FC<UserSummaryCardProps> = ({
  fullName,
  userId,
  tier,
  accountBalance,
  bankDetails,
  avatarUrl,
}) => {
  return (
    <div className="user-summary-card">
      {/* Avatar + Identity */}
      <div className="user-summary-card__identity">
        <div className="user-summary-card__avatar">
          {avatarUrl ? (
            <img src={avatarUrl} alt={fullName} className="user-summary-card__avatar-img" />
          ) : (
            <span className="user-summary-card__avatar-placeholder">
              {fullName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="user-summary-card__identity-text">
          <h2 className="user-summary-card__name">{fullName}</h2>
          <span className="user-summary-card__user-id">{userId}</span>
        </div>
      </div>

      <div className="user-summary-card__divider" />

      {/* Tier */}
      <div className="user-summary-card__tier">
        <span className="user-summary-card__tier-label">User&apos;s Tier</span>
        <div className="user-summary-card__stars" aria-label={`Tier ${tier} of 3`}>
          {[1, 2, 3].map((star) =>
            star <= tier ? (
              <StarFilledIcon key={star} className="user-summary-card__star user-summary-card__star--filled" />
            ) : (
              <StarEmptyIcon key={star} className="user-summary-card__star user-summary-card__star--empty" />
            )
          )}
        </div>
      </div>

      <div className="user-summary-card__divider" />

      {/* Balance */}
      <div className="user-summary-card__balance">
        <span className="user-summary-card__balance-amount">{accountBalance}</span>
        <span className="user-summary-card__balance-bank">{bankDetails}</span>
      </div>
    </div>
  );
};

export default UserSummaryCard;
