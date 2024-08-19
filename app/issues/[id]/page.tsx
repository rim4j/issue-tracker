import { prisma } from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

import authOptions from '@/app/auth/authOptions';
import { getServerSession } from 'next-auth';
import AssigneeSelect from './AssigneeSelect';
import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import { cache } from 'react';
interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params: { id } }: Props) => {
  //   if (typeof id != 'number') notFound();
  const session = await getServerSession(authOptions);

  const issue = await fetchUser(parseInt(id));

  if (!issue) return notFound();

  return (
    <Grid columns={{ initial: '1', md: '5' }} gap='5'>
      <Box className='lg:col-span-4 '>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction='column' gap='4'>
            <AssigneeSelect issue={issue} />
            <EditIssueButton id={issue.id} />
            <DeleteIssueButton id={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export const generateMetadata = async ({ params }: Props) => {
  const issue = await fetchUser(parseInt(params.id));
  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id,
  };
};

export default IssueDetailPage;
