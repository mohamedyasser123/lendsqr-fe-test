import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import UserDetailsBreadcrumb from '../components/UserDetails/UserDetailsBreadcrumb';
import UserDetailsHeader from '../components/UserDetails/UserDetailsHeader';
import UserSummaryCard from '../components/UserDetails/UserSummaryCard';
import UserDetailsTabs, { type TabId } from '../components/UserDetails/UserDetailsTabs';
import GeneralDetailsTab from '../components/UserDetails/GeneralDetailsTab';
import { ArrowLeftIcon } from '../components/icons';
import '../components/UserDetails/UserDetails.scss';
import { useUser } from '../hooks/useUser';

const SKELETON_STYLE = {
  background: 'linear-gradient(90deg, #f2f3f5 25%, #e6e8eb 37%, #f2f3f5 63%)',
  backgroundSize: '400% 100%',
  animation: 'skeleton-loading 1.4s ease infinite',
  borderRadius: '4px',
} as const;

const UserDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error, refetch } = useUser(id!);
  const [activeTab, setActiveTab] = useState<TabId>('general');

  if (isLoading) {
    return (
      <div className="user-details-page">
        <Link to="/users" className="user-details-back">
          <ArrowLeftIcon className="user-details-back__icon" />
          Back to Users
        </Link>
        <div style={{ marginTop: '24px', marginBottom: '32px' }}>
          <div style={{ height: '28px', width: '200px', ...SKELETON_STYLE }} />
        </div>
        <div className="user-summary-card" style={{ minHeight: '200px', display: 'flex', alignItems: 'center', padding: '30px' }}>
          <div   style={{
            ...SKELETON_STYLE,
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            flexShrink: 0,
          }} />
          <div style={{ marginLeft: '20px', flexGrow: 1 }}>
            <div style={{ height: '24px', width: '150px', ...SKELETON_STYLE, marginBottom: '12px' }} />
            <div style={{ height: '16px', width: '100px', ...SKELETON_STYLE }} />
          </div>
        </div>
        <div className="user-details-card" style={{ marginTop: '24px', padding: '30px', minHeight: '400px' }}>
          <div style={{ height: '20px', width: '150px', ...SKELETON_STYLE, marginBottom: '32px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '30px 20px' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ height: '12px', width: '80px', ...SKELETON_STYLE }} />
                <div style={{ height: '16px', width: '140px', ...SKELETON_STYLE }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    const is404 = (error as { response?: { status?: number } } | null)?.response?.status === 404;

    return (
      <div className="user-details-page">
        <Link to="/users" className="user-details-back">
          <ArrowLeftIcon className="user-details-back__icon" />
          Back to Users
        </Link>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <div className="error-state-content">
            {is404 ? (
              <>
                <svg className="error-state-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#E9B200" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <h3 className="error-state-title">User Not Found</h3>
                <p className="error-state-text">The user with this ID does not exist in the system. They may have been removed or the link is incorrect.</p>
                <Link to="/users">
                  <button type="button" className="error-state-btn">Back to Users</button>
                </Link>
              </>
            ) : (
              <>
                <svg className="error-state-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#E13535" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <h3 className="error-state-title">Failed to Load User</h3>
                <p className="error-state-text">An error occurred while fetching this user's details. Please check your connection and try again.</p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button type="button" className="error-state-btn" onClick={() => refetch()}>Try Again</button>
                  <Link to="/users">
                    <button type="button" className="error-state-btn" style={{ background: 'transparent', color: 'var(--color-active, #39CDCC)', border: '1px solid var(--color-active, #39CDCC)' }}>Back to Users</button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-details-page">
      <Link to="/users" className="user-details-back">
        <ArrowLeftIcon className="user-details-back__icon" />
        Back to Users
      </Link>

      <UserDetailsBreadcrumb />

      <UserDetailsHeader />

      <UserSummaryCard
        fullName={data.profile.fullName}
        userId={data.id}
        tier={1}
        accountBalance="₦200,000.00"
        bankDetails="9912345678 / Providus Bank"
      />

      <div className="user-details-tabs-wrapper">
        <UserDetailsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="user-details-card">
        {activeTab === 'general' && <GeneralDetailsTab user={data} />}
        {activeTab === 'documents' && (
          <div id="tabpanel-documents" role="tabpanel" aria-labelledby="tab-documents" className="details-section">
            <p style={{ color: 'var(--color-secondary, #545F7D)', fontFamily: 'Work Sans, sans-serif', fontSize: '14px' }}>
              Documents section — coming soon.
            </p>
          </div>
        )}
        {activeTab === 'bank-details' && (
          <div id="tabpanel-bank-details" role="tabpanel" aria-labelledby="tab-bank-details" className="details-section">
            <p style={{ color: 'var(--color-secondary, #545F7D)', fontFamily: 'Work Sans, sans-serif', fontSize: '14px' }}>
              Bank Details section — coming soon.
            </p>
          </div>
        )}
        {activeTab === 'loans' && (
          <div id="tabpanel-loans" role="tabpanel" aria-labelledby="tab-loans" className="details-section">
            <p style={{ color: 'var(--color-secondary, #545F7D)', fontFamily: 'Work Sans, sans-serif', fontSize: '14px' }}>
              Loans section — coming soon.
            </p>
          </div>
        )}
        {activeTab === 'savings' && (
          <div id="tabpanel-savings" role="tabpanel" aria-labelledby="tab-savings" className="details-section">
            <p style={{ color: 'var(--color-secondary, #545F7D)', fontFamily: 'Work Sans, sans-serif', fontSize: '14px' }}>
              Savings section — coming soon.
            </p>
          </div>
        )}
        {activeTab === 'app-system' && (
          <div id="tabpanel-app-system" role="tabpanel" aria-labelledby="tab-app-system" className="details-section">
            <p style={{ color: 'var(--color-secondary, #545F7D)', fontFamily: 'Work Sans, sans-serif', fontSize: '14px' }}>
              App and System section — coming soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsPage;