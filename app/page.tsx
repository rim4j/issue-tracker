import { prisma } from '@/prisma/client';
import { Flex, Grid } from '@radix-ui/themes';
import IssueChart from './IssueChart';
import IssueSummery from './IssueSummery';
import LatestIssues from './LatestIssues';
import { Metadata } from 'next';

const Home = async () => {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const close = await prisma.issue.count({ where: { status: 'CLOSE' } });

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='5'>
        <IssueSummery open={open} inProgress={inProgress} close={close} />
        <IssueChart open={open} inProgress={inProgress} close={close} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};

export default Home;

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summery of project issues',
};
