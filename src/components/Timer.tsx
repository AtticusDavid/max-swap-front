import React, { useEffect, useState } from 'react';

import { CircularProgress } from '@chakra-ui/react';
import { secondsToMilliseconds } from 'date-fns';

import { useInterval } from 'src/hooks/useInterval';

interface Props {
  isIndeterminate: boolean;
  onTimerEnd: () => void;
  needRefreshTimer: boolean;
  onRefreshTimer: () => void;
}

const Timer = ({ isIndeterminate, onTimerEnd, needRefreshTimer, onRefreshTimer }: Props) => {
  const [refreshTimer, setRefreshTimer] = useState(secondsToMilliseconds(10));

  useInterval(() => {
    if (refreshTimer <= 0) {
      setRefreshTimer(secondsToMilliseconds(10));
      onTimerEnd();
      return;
    }
    setRefreshTimer(prev => prev - 16);
  }, 16);

  useEffect(() => {
    if (!needRefreshTimer) return;
    setRefreshTimer(secondsToMilliseconds(10));
    onRefreshTimer();
  }, [needRefreshTimer, onRefreshTimer]);

  return (
    <CircularProgress
      isIndeterminate={isIndeterminate}
      value={(refreshTimer / secondsToMilliseconds(10)) * 100}
      size="28px"
      thickness="12px"
      color="secondary.200"
    />
  );
};

export default Timer;
