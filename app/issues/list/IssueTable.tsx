import { IssueStatusBadge, Link } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ issues, searchParams }: Props) => {
  return (
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
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'max-md:hidden' },
  { label: 'Created', value: 'createdAt', className: 'max-md:hidden' },
];

export const columnNames = columns.map((i) => i.value);

export default IssueTable;
