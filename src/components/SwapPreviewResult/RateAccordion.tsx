import React from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  HStack,
  AccordionIcon,
  Spacer,
  SkeletonText,
  AccordionPanel,
  Text,
} from '@chakra-ui/react';

interface Props {
  isLoaded: boolean;
  fromTokenSymbol: string;
  toTokenSymbol: string;
  inputAmount: number;
  outputAmount: number;
}

const RateAccordion = ({
  isLoaded,
  inputAmount,
  outputAmount,
  fromTokenSymbol,
  toTokenSymbol,
}: Props) => {
  const rateText = `1 ${fromTokenSymbol} = ${(outputAmount / inputAmount).toFixed(
    5,
  )} ${toTokenSymbol}`;

  return (
    <Accordion allowToggle mb={2}>
      <AccordionItem>
        <AccordionButton paddingX={0}>
          <HStack flex={1}>
            <Text fontSize={['sm', 'md', 'md', 'md']}>Rate</Text>
            <AccordionIcon />
            <Spacer />
            <SkeletonText
              isLoaded={isLoaded}
              noOfLines={1}
              startColor="blueGray.200"
              endColor="blueGray.400">
              <Text fontSize={['sm', 'md', 'md', 'md']}>{rateText}</Text>
            </SkeletonText>
          </HStack>
        </AccordionButton>
        <AccordionPanel>
          <SkeletonText
            isLoaded={isLoaded}
            noOfLines={2}
            startColor="blueGray.200"
            endColor="blueGray.400">
            <HStack justifyContent="space-between">
              <Text fontSize={['sm', 'md', 'md', 'md']}>{`1 ${fromTokenSymbol} price`}</Text>
              <Text fontSize={['sm', 'md', 'md', 'md']}>{`${(inputAmount / outputAmount).toFixed(
                5,
              )} ${toTokenSymbol}`}</Text>
            </HStack>
            <HStack justifyContent="space-between" mt={2}>
              <Text fontSize={['sm', 'md', 'md', 'md']}>{`1 ${toTokenSymbol} price`}</Text>
              <Text fontSize={['sm', 'md', 'md', 'md']}>{`${(outputAmount / inputAmount).toFixed(
                5,
              )} ${fromTokenSymbol}`}</Text>
            </HStack>
          </SkeletonText>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default RateAccordion;
