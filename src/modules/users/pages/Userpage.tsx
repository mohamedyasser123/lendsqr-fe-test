import React, { useState, useCallback } from 'react';
import UsersHeader from '../components/UsersHeader';
import UsersStats from '../components/UsersStats';
import UsersTable from '../components/UsersTable';
import Pagination from '../components/Pagination';
import './Userpage.scss';
import { useUsers } from '../hooks/useUsers';

const INITIAL_FILTERS = {
  organization: '',
  username: '',
  email: '',
  phoneNumber: '',
  status: '',
  date: '',
};

const Userpage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(INITIAL_FILTERS);

  const { data, isLoading, isFetching, isPlaceholderData, isError, refetch } = useUsers({
    page,
    limit,
    ...appliedFilters,
  });

  const showSkeleton = isLoading || (isFetching && !isPlaceholderData && !data);

  const tableState: 'loading' | 'default' | 'empty' | 'error' = showSkeleton
    ? 'loading'
    : isError
    ? 'error'
    : data?.data.length
    ? 'default'
    : 'empty';

  const handleFilterChange = useCallback((key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleApplyFilters = useCallback(() => {
    setAppliedFilters(filters);
    setPage(1);
  }, [filters]);

  const handleResetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setAppliedFilters(INITIAL_FILTERS);
    setPage(1);
  }, []);

  const handleLimitChange = useCallback((value: number) => {
    setLimit(value);
    setPage(1);
  }, []);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="users-page">
      <UsersHeader />
      <UsersStats />

      <UsersTable
        state={tableState}
        users={data?.data ?? []}
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
        onRetry={handleRetry}
      />

      {!isError && tableState !== 'empty' && data && (
        <Pagination
          page={page}
          limit={limit}
          totalPages={data.pages}
          totalItems={data.items}
          onPageChange={setPage}
          onLimitChange={handleLimitChange}
        />
      )}
    </div>
  );
};

export default Userpage;