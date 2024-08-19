import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
  open: number;
  inProgress: number;
  close: number;
}

const IssueSummery = ({ open, inProgress, close }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In-Progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Close Issues', value: close, status: 'CLOSE' },
  ];

  return (
    <Flex gap='4'>
      {containers.map((item, i) => (
        <Card key={i}>
          <Flex direction='column' gap='1'>
            <Link
              className='text-sm font-medium'
              href={`/issues/list?status=${item.status}`}
            >
              {item.label}
            </Link>
            <Text size='5' className='font-bold'>
              {item.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummery;
