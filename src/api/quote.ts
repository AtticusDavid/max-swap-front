import { QueryFunctionContext } from 'react-query';

import axiosInstance from 'src/config/axios';
import { GetQuoteRequestParams, QuoteResponseDto } from 'src/types';

export const fetchQuote = async ({
  queryKey,
}: QueryFunctionContext<[string, GetQuoteRequestParams | undefined]>): Promise<
  Omit<QuoteResponseDto, 'ts' | 'error'> | undefined
> => {
  const [_key, queryParams] = queryKey;

  if (!queryParams || queryParams.amount === '0') return;

  const { data } = await axiosInstance.post<QuoteResponseDto>('/api/v1/quote/calculate', {
    options: queryParams,
    metaData: 'string',
  });

  const { error, ts, ...result } = data;

  return result;
};
