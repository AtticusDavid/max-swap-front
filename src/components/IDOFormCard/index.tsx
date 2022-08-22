import React, { useState } from 'react';

import { HStack, Spacer, Box, Button, Text, useTheme, Heading } from '@chakra-ui/react';

import KlayAmountForm from '../KlayAmountForm';
import styles from './IDOFormCard.module.scss';

const klayBalance = 1000;
const iznInKlay = 0.22;

const IDOFormCard = () => {
  const theme = useTheme();

  const [amount, setAmount] = useState<number | undefined>(undefined);
  const isInvalid = amount === undefined ? false : amount > klayBalance;

  return (
    <Box
      className={styles.container}
      padding={12}
      w={['100%', '80%', '80%', '50%']}
      borderRadius={8}>
      <Heading as="h2" size="xl" alignSelf="start" marginBottom={4}>
        IDO
      </Heading>

      <HStack w="100%" paddingY={1}>
        <Text fontSize={['md', 'lg', 'lg', 'xl']}>Klay Balance</Text>
        <Spacer />
        <Text fontSize={['md', 'lg', 'lg', 'xl']}>{`${klayBalance.toLocaleString()} KLAY`}</Text>
      </HStack>

      <HStack w="100%" paddingY={1}>
        <Text fontSize={['md', 'lg', 'lg', 'xl']}>IZN price</Text>
        <Spacer />
        <Text fontSize={['md', 'lg', 'lg', 'xl']}>0.22 KLAY</Text>
      </HStack>

      <KlayAmountForm
        amount={amount}
        handleChange={e => setAmount(parseInt(e.target.value, 10))}
        isInvalid={isInvalid}
      />

      <HStack w="100%" marginY={4}>
        <Text fontSize={['md', 'lg', 'lg', 'xl']} fontWeight={500}>
          Expected IZN Amount
        </Text>
        <Spacer />
        <Text
          color={theme.colors.secondary[300]}
          fontSize={['md', 'lg', 'lg', 'xl']}
          fontWeight="600">{`${
          // @ts-expect-error amount could be undefined
          isNaN(amount) ? 0 : ((amount ?? 0) / iznInKlay).toFixed(4)
        } IZN`}</Text>
      </HStack>

      <Box w="100%" h="2" />

      <Button
        isDisabled={amount === undefined || isInvalid}
        w="100%"
        size="lg"
        height={['48px', '54px', '54px', '64px']}
        fontSize={['md', 'lg', 'lg', 'xl']}
        opacity={1}
        colorScheme="primary">
        Buy
      </Button>
    </Box>
  );
};

export default IDOFormCard;
