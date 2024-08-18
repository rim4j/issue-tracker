import { prisma } from '@/prisma/client';
import { Table } from '@radix-ui/themes';

import { IssueStatusBadge, Link } from '@/app/components';
import IssueActions from './IssueActions';
import { Status } from '@prisma/client';

interface Props {
  searchParams: { status: Status };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='max-md:hidden'>
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='max-md:hidden'>
              Created
            </Table.ColumnHeaderCell>
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
