import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Text, VStack, HStack, Flex, Button, Input, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon } from '@chakra-ui/react';

const slippageOptions = [0.1, 0.5, 1, 3];

interface Props {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

const SlippageInput = ({ value, setValue }: Props) => {
  const [slippageOptionRatio, setSlippageOptionRatio] = useState<number>(1);
  const [slippageCustomRatio, setSlippageCustomRatio] = useState<string>('');

  useEffect(() => {
    setValue(slippageCustomRatio ? Number(slippageCustomRatio) : slippageOptionRatio);
  }, [slippageCustomRatio, slippageOptionRatio]);

  return (
    <VStack alignItems="start">
      <Accordion allowToggle width="100%" >
        <AccordionItem style={{ borderWidth: 0 }}>
          <AccordionButton paddingX={2}>
            <HStack justifyContent={"space-between"} width="100%">
              <HStack>
                <Text fontSize={['sm', 'md', 'md', 'md']}>Slippage</Text>
                <AccordionIcon />
              </HStack>

              <Text fontSize={['sm', 'md', 'md', 'md']}>{`${
                // slippageCustomRatio || slippageOptionRatio
                value
                }%`}</Text>
            </HStack>
          </AccordionButton>
          <AccordionPanel>
            <Flex flexWrap="wrap" gap="2" justifyContent={'space-between'} width="100%">
              <Flex columnGap={2}>
                {slippageOptions.map(option => {
                  return (
                    <Button
                      key={option}
                      onClick={() => {
                        setSlippageOptionRatio(option);
                        setSlippageCustomRatio('');
                      }}
                      colorScheme={
                        slippageCustomRatio === '' && slippageOptionRatio === option
                          ? 'secondary'
                          : undefined
                      }
                      size="sm"
                    >
                      {option}%
                    </Button>
                  );
                })}
              </Flex>
              <Input
                id="slippageCustomRatio"
                size="sm"
                value={slippageCustomRatio}
                onChange={e => setSlippageCustomRatio(e.target.value)}
                type="number"
                placeholder="custom"
                inputMode="decimal"
                width={['100%', '100%', '100px']}
                onWheel={e => (e.target as HTMLInputElement).blur()}
              />
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
};

export default SlippageInput;
