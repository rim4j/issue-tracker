import { prisma } from '@/prisma/client';
import { Button, Table } from '@radix-ui/themes';
import Link from 'next/link';
const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <div className='mb-5'>
        <Button>
          <Link href='/issues/new'>New Issues</Link>
        </Button>
      </div>
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
                {item.title}
                <div className='block md:hidden'>{item.status}</div>
              </Table.Cell>
              <Table.Cell className=' max-md:hidden'>{item.status}</Table.Cell>
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
