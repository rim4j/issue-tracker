import { prisma } from '@/prisma/client';
import { Table } from '@radix-ui/themes';

import { IssueStatusBadge, Link } from '@/app/components';
import IssueActions from './IssueActions';
import { Issue, Status } from '@prisma/client';
import NextLink from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'max-md:hidden' },
    { label: 'Created', value: 'createdAt', className: 'max-md:hidden' },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columns
    .map((item) => item.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy: orderBy,
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map((item, i) => (
              <Table.ColumnHeaderCell key={i} className={item.className}>
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: item.value },
                  }}
                >
                  {item.label}
                </NextLink>
                {item.value === searchParams.orderBy && (
                  <ArrowUpIcon className='inline' />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>
                <Link href={`/issues/${item.id}`}>{item.title}</Link>

                <div className='block md:hidden'>
                  <IssueStatusBadge status={item.status} />
                </div>
              </Table.Cell>
              <Table.Cell className=' max-md:hidden'>
                <IssueStatusBadge status={item.status} />
              </Table.Cell>
              <Table.Cell className='max-md:hidden'>
                {item.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;
