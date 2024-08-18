'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Close', value: 'CLOSE' },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(status) => {
        if (status === 'All') return router.push('/issues/list');
        const query = status ? `?status=${status}` : '';
        router.push('/issues/list' + query);
      }}
    >
      <Select.Trigger placeholder='Filter by status ...' />
      <Select.Content>
        {statuses.map((item, index) => (
          <Select.Item key={index} value={item.value || 'All'}>
            {item.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
