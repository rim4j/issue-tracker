'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';

interface Props {
  id: number;
}
const DeleteIssueButton = ({ id }: Props) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'>
          Delete Issue
          {/* <Pencil2Icon /> */}
          {/* <Link href={`/issues/${id}/edit`}> Edit issue</Link> */}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action can not be
          undone.
        </AlertDialog.Description>
        <Flex mt='4' gap='3'>
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color='red'>Delete Issue</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
