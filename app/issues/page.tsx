import { prisma } from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueStatusBadge from '../components/IssueStatusBadge';
import delay from 'delay';
import IssueActions from './IssueActions';
import Link from '../components/Link';

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  await delay(2000);

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

export default IssuesPage;
