import React, { useState } from 'react';

import { HStack, Text, useInterval, Heading, Box, Progress, useTheme } from '@chakra-ui/react';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';

import styles from './PromotionInfoCard.module.scss';

const saleEndDateTime = new Date('2022-04-22T20:00:00');

const PromotionInfoCard = () => {
  const theme = useTheme();
  const [timer, setTimer] = useState<{
    day: number;
    hour: number;
    minute: number;
    second: number;
  }>(() => {
    const now = new Date();

    const secondDifference = differenceInSeconds(saleEndDateTime, now) % 60;
    const minuteDifference = differenceInMinutes(saleEndDateTime, now) % 60;
    const hourDifference = differenceInHours(saleEndDateTime, now) % 7;
    const dayDifference = differenceInDays(saleEndDateTime, now);

    return {
      day: dayDifference,
      hour: hourDifference,
      minute: minuteDifference,
      second: secondDifference,
    };
  });

  useInterval(() => {
    const now = new Date();

    const secondDifference = differenceInSeconds(saleEndDateTime, now) % 60;
    const minuteDifference = differenceInMinutes(saleEndDateTime, now) % 60;
    const hourDifference = differenceInHours(saleEndDateTime, now) % 7;
    const dayDifference = differenceInDays(saleEndDateTime, now);

    setTimer({
      day: dayDifference,
      hour: hourDifference,
      minute: minuteDifference,
      second: secondDifference,
    });
  }, 1000);

  return (
    <Box
      className={styles.container}
      mt={12}
      padding={12}
      w={['100%', '80%', '80%', '50%']}
      borderRadius={8}>
      <Heading as="h2" size="lg" alignSelf="start">
        Limited Offer
      </Heading>
      <Text fontSize={['md', 'lg', 'lg', 'xl']} alignSelf="start">
        Time left until{' '}
      </Text>

      <HStack pt={8} columnGap={[2, 4, 4, 8]} justifyContent="center">
        <Box>
          <Text fontSize={['lg', 'xl', 'xl', '2xl']} textAlign="center">
            {timer.day}
          </Text>
          <Text>Days</Text>
        </Box>
        <Box>
          <Text fontSize={['lg', 'xl', 'xl', '2xl']} textAlign="center">
            {timer.hour >= 10 ? timer.hour : `0${timer.hour}`}
          </Text>
          <Text>Hours</Text>
        </Box>
        <Box>
          <Text fontSize={['lg', 'xl', 'xl', '2xl']} textAlign="center">
            {timer.minute >= 10 ? timer.minute : `0${timer.minute}`}
          </Text>
          <Text>Minutes</Text>
        </Box>
        <Box>
          <Text fontSize={['lg', 'xl', 'xl', '2xl']} textAlign="center">
            {timer.second >= 10 ? timer.second : `0${timer.second}`}
          </Text>
          <Text>Seconds</Text>
        </Box>
      </HStack>

      <Heading as="h3" size="md" paddingTop={8} paddingBottom={2} alignSelf="start">
        Volume left
      </Heading>
      <Progress w="100%" colorScheme="primary" size="lg" value={20} />
    </Box>
  );
};

export default PromotionInfoCard;
