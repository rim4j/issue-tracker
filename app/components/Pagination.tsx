'use client';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push('?' + params.toString());
  };

  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount <= 1) return null;

  return (
    <Flex direction='column' align='center' justify='center'>
      <Flex gap='2'>
        <Button
          onClick={() => changePage(1)}
          color='gray'
          variant='soft'
          disabled={currentPage === 1}
        >
          <DoubleArrowLeftIcon />
        </Button>
        <Button
          onClick={() => changePage(currentPage - 1)}
          color='gray'
          variant='soft'
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          onClick={() => changePage(currentPage + 1)}
          color='gray'
          variant='soft'
          disabled={currentPage === pageCount}
        >
          <ChevronRightIcon />
        </Button>
        <Button
          onClick={() => changePage(pageCount)}
          color='gray'
          variant='soft'
          disabled={currentPage === pageCount}
        >
          <DoubleArrowRightIcon />
        </Button>
      </Flex>
      <Text size='2'>
        Page {currentPage} of {pageCount}
      </Text>
    </Flex>
  );
};

export default Pagination;
