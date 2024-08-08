import { Table } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import IssueActions from './IssueActions';

const LoadingIssuesPage = () => {
  const issues = [1, 2, 3, 4, 5];

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
            <Table.Row key={item}>
              <Table.Cell>
                <Skeleton />
                <div className='block md:hidden'>
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className=' max-md:hidden'>
                <Skeleton />
              </Table.Cell>
              <Table.Cell className='max-md:hidden'>
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingIssuesPage;
