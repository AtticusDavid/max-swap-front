import { QueryFunctionContext } from 'react-query';

import axiosInstance from 'src/config/axios';
import { ErrorResponse } from 'src/types';

export interface FetchBalanceResponseDto {
  error?: ErrorResponse;
  ts: string;
  result: {
    tokenAddress: string;
    amount: string;
    priceUsdc: number;
  }[];
}

export const fetchBalance = async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
  const [_, address] = queryKey;

  const { data } = await axiosInstance.get<FetchBalanceResponseDto>('/api/v1/tokens/balance', {
    params: { address },
  });

  return data.result;
};

export type FetchCurrencyParams = {
  coinId: 'tether' | 'ethereum' | 'usd-coin'; targetCurrency: 'krw' | 'usd'
}

export const fetchCurrency = async ({
  queryKey,
}: QueryFunctionContext<
  [string, FetchCurrencyParams]
>) => {
  const [_, params] = queryKey;

  const { data } = await axiosInstance.get<number>('/api/css/currency', { params });

  return data;
};
