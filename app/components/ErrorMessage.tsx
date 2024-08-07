import React, { PropsWithChildren, ReactNode } from 'react';
import { Text } from '@radix-ui/themes';

// interface Props {
//   children: ReactNode;
// }

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <Text as='p' color='red'>
      {children}
    </Text>
  );
};

export default ErrorMessage;
