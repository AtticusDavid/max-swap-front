import React, { ChangeEvent } from 'react';

import { TriangleDownIcon } from '@chakra-ui/icons';
import {
  useDisclosure,
  Button,
  Avatar,
  InputGroup,
  Input,
  InputRightElement,
  Text,
  Box,
  Heading,
  Stack,
  FormControl,
  FormErrorMessage,
  HStack,
} from '@chakra-ui/react';
import { PrimitiveAtom, useAtom, useAtomValue } from 'jotai';

import { tokenListAtom } from 'src/domain/chain/atom';
import { Token } from 'src/domain/chain/types';
import {
  useCurrency,
} from 'src/domain/swap/atom';

import TokenSelectDialog from './TokenSelectDialog';

interface Props {
  tokenAddressAtom: PrimitiveAtom<string | undefined>;
  amount: number | string | undefined;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isReadOnly?: boolean;
  modalHeaderTitle: string;
  label: string;
  isInvalid?: boolean;
}

const BASE_URL = 'https://static.eisenfinance.com/tokens';

const TokenAmountInput = ({
  amount,
  tokenAddressAtom,
  handleChange,
  modalHeaderTitle,
  label,
  isReadOnly,
  isInvalid,
}: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { currency, getPriceInCurrency } = useCurrency();

  const tokenList = useAtomValue(tokenListAtom);
  const [selectedTokenAddress, setSelectedTokenAddress] = useAtom(tokenAddressAtom);
  const selectedToken = tokenList.find(x => x.address === selectedTokenAddress);

  const filteredTokenList = tokenList.filter(({ address }) => address !== selectedTokenAddress);

  const tokenPriceInCurrency = selectedTokenAddress ? getPriceInCurrency(selectedTokenAddress) : undefined;
  const priceInCurrency = tokenPriceInCurrency ? (tokenPriceInCurrency * Number(amount)).toFixed(2) : undefined;

  return (
    <>
      <TokenSelectDialog
        headerTitle={modalHeaderTitle}
        isOpen={isOpen}
        onClose={onClose}
        tokenList={filteredTokenList}
        onSelectItem={(token: Token) => setSelectedTokenAddress(token.address)}
      />

      <Heading as="h3" size="md">
        {label}
      </Heading>
      <Stack
        marginTop={4}
        direction={['column', 'column', 'column', 'row']}
        spacing={[4, 4, 4, 12]}>
        <Button
          onClick={onOpen}
          size="lg"
          minWidth="160px"
          colorScheme="blueGray"
          variant="outline"
          leftIcon={
            <Avatar
              w={8}
              h={8}
              src={
                selectedToken?.iconFileExtension
                  ? `${BASE_URL}/${selectedToken?.address}/icon.${selectedToken.iconFileExtension}`
                  : selectedToken?.logoURI
              }
            />
          }
          rightIcon={<TriangleDownIcon />}>
          {selectedToken?.symbol}
        </Button>

        <FormControl isInvalid={isInvalid}>
          <InputGroup size="lg" minWidth="160px">
            <Input
              value={amount}
              onChange={handleChange}
              isReadOnly={isReadOnly}
              readOnly={isReadOnly}
              id="amount"
              type="number"
              placeholder="0"
              inputMode="decimal"
              maxLength={29}
              focusBorderColor="secondary.200"
              onWheel={e => (e.target as HTMLInputElement).blur()}
            />
            <InputRightElement marginRight={4}>
              <Box paddingX={4}>
                <Text textAlign="center" fontSize={['sm', 'md', 'md', 'md']}>
                  {selectedToken?.symbol}
                </Text>
              </Box>
            </InputRightElement>
          </InputGroup>
          {isInvalid ? (
            <FormErrorMessage fontSize={['sm', 'md', 'md', 'md']}>
              Amount of token is unavailable to swap
            </FormErrorMessage>
          ) : null}
        </FormControl>
      </Stack>
      <Box h={1} />
      {priceInCurrency !== 'NaN' && priceInCurrency !== 'Infinity' && priceInCurrency &&
        <HStack justifyContent="flex-end">
          <Text color="blueGray.200">
            {priceInCurrency} {currency.toUpperCase()}
          </Text>
        </HStack>
      }
    </>
  );
};

export default TokenAmountInput;
