import { Button } from '@radix-ui/themes';

interface Props {
  id: number;
}
const DeleteIssueButton = ({ id }: Props) => {
  return (
    <Button color='red'>
      Delete Issue
      {/* <Pencil2Icon /> */}
      {/* <Link href={`/issues/${id}/edit`}> Edit issue</Link> */}
    </Button>
  );
};

export default DeleteIssueButton;
