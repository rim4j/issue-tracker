import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { prisma } from '@/prisma/client';
import { Flex, Heading, Card, Grid, Box, Button } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import { Pencil2Icon } from '@radix-ui/react-icons';

import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  //   if (typeof id != 'number') notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) return notFound();

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex className='space-x-3' my='2'>
          <IssueStatusBadge status={issue.status} />
          <p>{issue.createdAt.toDateString()}</p>
        </Flex>
        <Card className='prose  mt-4'>
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}> Edit issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
