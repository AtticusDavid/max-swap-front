import React from 'react';

import { Box, Text, HStack, Spacer, SkeletonText } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';

import { tokenInAmountAtom, tokenInAtom, tokenOutAtom, useCurrency } from 'src/domain/swap/atom';
import { QuoteResponseDto } from 'src/types';

import RateAccordion from './RateAccordion';
import SingleDexAccordion from './SingleDexAccordion';


interface Props {
  previewResult: Omit<QuoteResponseDto, "ts" | 'error'>;
  isLoaded?: boolean;
  expectedInputAmount: number;
  expectedOutputAmount: number;
}

const calculatePriceImpact = ({
  inputTokenAmount,
  outputTokenPriceInUSDT,
  outputTokenAmountBeforeFeeDeducted,
  inputTokenPriceInUSDT,
}: {
  inputTokenAmount: number;
  outputTokenPriceInUSDT: number;
  outputTokenAmountBeforeFeeDeducted: number;
  inputTokenPriceInUSDT: number;
}) => {
  return (
    100 *
    ((inputTokenAmount * outputTokenPriceInUSDT) /
      (outputTokenAmountBeforeFeeDeducted * inputTokenPriceInUSDT) -
      1)
  );
};

const SwapPreviewResult = ({
  previewResult,
  expectedInputAmount,
  expectedOutputAmount,
  isLoaded = true,
}: Props) => {
  const tokenIn = useAtomValue(tokenInAtom);
  const tokenInAmount = useAtomValue(tokenInAmountAtom);
  const tokenOut = useAtomValue(tokenOutAtom);

  const { getPriceInUSDC } = useCurrency();

  const priceImpact = tokenInAmount && tokenOut && tokenIn && getPriceInUSDC(tokenOut.address) && getPriceInUSDC(tokenIn.address) && calculatePriceImpact({
    inputTokenAmount: tokenInAmount,
    inputTokenPriceInUSDT: getPriceInUSDC(tokenIn.address)!,
    outputTokenPriceInUSDT: getPriceInUSDC(tokenOut.address)!,
    outputTokenAmountBeforeFeeDeducted: expectedOutputAmount,
  });

  if (!tokenOut) return null;

  return (
    <Box paddingX={12} marginY={8} w={['100%', '80%', '80%', '50%']} maxW="700px">
      {tokenIn && tokenIn && expectedOutputAmount ? (
        <RateAccordion
          isLoaded={isLoaded}
          inputAmount={expectedInputAmount}
          outputAmount={expectedOutputAmount}
          fromTokenSymbol={tokenIn.symbol}
          toTokenSymbol={tokenOut.symbol}
        />
      ) : null}

      {tokenInAmount ? (
        <HStack w="100%" paddingY={1}>
          <Text fontSize={['sm', 'md', 'md', 'md']}>Price Impact</Text>
          <Spacer />
          <SkeletonText
            isLoaded={isLoaded}
            noOfLines={1}
            startColor="blueGray.200"
            endColor="blueGray.400">
            <Text fontSize={['sm', 'md', 'md', 'md']}>
              {priceImpact?.toFixed(1)}
              %
            </Text>
          </SkeletonText>
        </HStack>
      ) : null}

      {<SingleDexAccordion
        singleDexResult={previewResult.singleDexes}
        isLoaded={isLoaded}
      />}
    </Box>
  );
};

export default SwapPreviewResult;
