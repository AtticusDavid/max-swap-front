import React, { ChangeEvent } from 'react';

import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  FormErrorMessage,
  Text,
  useTheme,
} from '@chakra-ui/react';

interface Props {
  amount: number | undefined;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isInvalid: boolean;
}

const KlayAmountForm = ({ amount, handleChange, isInvalid }: Props) => {
  const theme = useTheme();
  return (
    <FormControl isRequired isInvalid={isInvalid}>
      <FormLabel mt={4} fontSize={['md', 'lg', 'lg', 'xl']}>
        KLAY amount
      </FormLabel>
      <InputGroup size="lg">
        <Input
          value={amount}
          onChange={handleChange}
          id="amount"
          type="number"
          placeholder="0"
          onWheel={e => (e.target as HTMLInputElement).blur()}
        />
        <InputRightElement marginRight={4}>
          <Text fontSize={['sm', 'md', 'md', 'md']} color={theme.colors.blueGray[200]}>
            KLAY
          </Text>
        </InputRightElement>
      </InputGroup>
      {isInvalid ? (
        <FormErrorMessage fontSize={['sm', 'md', 'md', 'md']}>
          Amount should be smaller than your balance
        </FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default KlayAmountForm;
