import { ErrorResponse } from './common';

export interface GetQuoteRequestParams {
  tokenInAddr: string;
  tokenOutAddr: string;
  from: string;
  /**
   * TODO: decimal 처리 필요한지 확인하기
   */
  amount: string;
  /**
   * slippage 허용오차 10000 => 100%, 30 => 0.3%
   */
  slippageBps: number;
  /**
   * amount를 최대 몇 개로 분할할 것인지
   */
  maxSplit: number;
  /**
   * max edge of graph
   */
  maxEdge: number;
  /**
   * set true for flash loan
   */
  withCycle: boolean;
}

interface QuoteSingleSwapInfo {
  fromToken: string;
  toToken: string;
  dexId: string;
  pool: string;
}

export interface QuoteResponseDto {
  error?: ErrorResponse;
  ts: string;
  metamaskSwapTransaction: {
    from: string;
    to: string;
    value: string;
    data: string;
    gasLimit: number;
  };
  dexAgg: {
    fromToken: string;
    amountIn: string;
    toToken: string;
    splitInfos: {
      weight: number;
      swapInfos: QuoteSingleSwapInfo[];
    }[];
    expectedAmountOut: string;
  };
  cycles: {
    token: string;
    amountIn: string;
    swapInfos: QuoteSingleSwapInfo[];
    expectedAmountOut: string;
    expectedProfit: string;
  }[];
  singleDexes: {
    dexId: string;
    fromToken: string;
    amountIn: string;
    toToken: string;
    expectedAmountOut: string;
  }[];
}
