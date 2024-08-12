import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
  id: number;
}

const EditIssueButton = ({ id }: Props) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/edit/${id}`}> Edit issue</Link>
    </Button>
  );
};

export default EditIssueButton;
