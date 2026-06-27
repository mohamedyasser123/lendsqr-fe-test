import React, { useState } from 'react';
import UsersHeader from '../components/UsersHeader';
import UsersStats from '../components/UsersStats';
import UsersTable from '../components/UsersTable';
import Pagination from '../components/Pagination';
import './Userpage.scss';
import { useUsers } from '../hooks/useUsers';

// Mock data matching the Figma screenshot precisely



export const Userpage: React.FC = () => {
 const [page, setPage] = useState(1);
const [limit, setLimit] = useState(10);

const { data, isLoading, isError } = useUsers({
  page,
  limit,
});
const tableState = isLoading
  ? "loading"
  : isError
  ? "error"
  : data?.data.length
  ? "default"
  : "empty";
console.log(data);

  return (
    <div className="users-page">
      {/* Visual State Selector for Assessment Reviewers */}

      <UsersHeader />
      <UsersStats />
      
<UsersTable
  state={tableState}
  users={data?.data ?? []}
/>
      {/* Render Pagination only when showing valid data or loading (skeletons) */}
{!isError && <Pagination
  page={page}
  limit={limit}
  totalPages={data?.pages ?? 1}
  totalItems={data?.items ?? 0}
  onPageChange={setPage}
  onLimitChange={(value) => {
    setLimit(value);
    setPage(1);
  }}
/>}    </div>
  );
};

export default Userpage;