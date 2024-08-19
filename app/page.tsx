import { prisma } from '@/prisma/client';
import { Pagination } from './components';
import IssueSummery from './IssueSummery';
import LatestIssues from './LatestIssues';
import IssueChart from './IssueChart';
import { Flex, Grid } from '@radix-ui/themes';

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
