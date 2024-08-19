import { prisma } from '@/prisma/client';
import { Pagination } from './components';
import IssueSummery from './IssueSummery';
import LatestIssues from './LatestIssues';
import IssueChart from './IssueChart';

const Home = async () => {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const close = await prisma.issue.count({ where: { status: 'CLOSE' } });

  return (
    <>
      <IssueChart open={open} inProgress={inProgress} close={close} />
      {/* <IssueChart /> */}
    </>
  );
};

export default Home;
