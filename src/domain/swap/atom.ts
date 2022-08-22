import { atom, useAtomValue } from 'jotai';
import { atomWithQuery } from 'jotai/query'
import { loadable } from 'jotai/utils';

import { FetchBalanceResponseDto } from 'src/api/token';
import axiosInstance from 'src/config/axios';
import { wallStateAtom } from 'src/hooks/useWallet';

import { tokenListAtom } from '../chain/atom';
import { Token } from '../chain/types';


export const pageModeAtom = atom<'swap' | 'flash'>('swap');
export const tokenInAddressAtom = atom<string | undefined>(undefined);

export const targetCurrencyAtom = atom<'krw' | 'usd'>('usd');

export const targetCurrencyInUSDCAtom = atomWithQuery(get => ({
  queryKey: ['currency', {
    coinId: 'usd-coin',
    targetCurrency: get(targetCurrencyAtom)
  }],
  queryFn: async ({ queryKey }) => {

    const [_, params] = queryKey;

    const { data } = await axiosInstance.get<number>('/api/css/currency', { params });

    return data;
  }
}))

export const tokenPriceListAtom = atomWithQuery(get => ({
  queryKey: ['address', get(wallStateAtom).address],
  queryFn: async ({ queryKey }) => {
    const [_, address] = queryKey;

    const { data } = await axiosInstance.get<FetchBalanceResponseDto>('/api/v1/tokens/balance', {
      params: { address },
    });

    return data.result;
  }

}))

export const tokenOutAddressAtom = atom<string | undefined>(undefined);

export const tokenInAtom = atom<Token | undefined>(get => {
  if (!get(tokenInAddressAtom)) {
    return undefined;
  }

  const tokenList = get(tokenListAtom);
  const result = tokenList.find(x => x.address === get(tokenInAddressAtom));

  if (!result) {
    return tokenList[0];
  }

  return result;
});

export const tokenOutAtom = atom<Token | undefined>(get => {
  if (!get(tokenOutAddressAtom)) {
    return undefined;
  }

  const tokenList = get(tokenListAtom);
  const result = tokenList.find(({ address }) => address === get(tokenOutAddressAtom));

  if (!result) {
    return tokenList[1];
  }

  return result;
});

export const getTokenOutDenomAtom = atom<(amount: string) => number>(
  get => {
    return (amount: string) => {
      const decimals = get(tokenOutAtom)?.decimals;
      if (decimals) {
        return parseInt(amount, 10) * Math.pow(10, -1 * decimals)
      }
      return 0;

    }
  }
)

export const tokenInAmountAtom = atom<number | undefined>(undefined);

export const slippageRatioAtom = atom<number>(1);


/** 
 * TODO: currency 관련 로직들 파일 분리
 * 
 */
export const useCurrency = () => {
  const tokenPriceListLoadable = useAtomValue(loadable(tokenPriceListAtom));
  const tokenPriceList = tokenPriceListLoadable.state === 'hasData' ? tokenPriceListLoadable.data : undefined;


  const currency = useAtomValue(targetCurrencyAtom);
  const currencyLoadable = useAtomValue(loadable(targetCurrencyInUSDCAtom));
  const currencyInUSDC = currencyLoadable.state === 'hasData' ? currencyLoadable.data : undefined;



  const getPriceInUSDC = (tokenAddr: string) => {
    return tokenPriceList && (tokenPriceList.find(x => x.tokenAddress === tokenAddr)?.priceUsdc ?? 0)
  }

  const getPriceInCurrency = (tokenAddr: string) => {
    const priceInUSDC = getPriceInUSDC(tokenAddr)
    if (priceInUSDC && currencyInUSDC) {
      return priceInUSDC * currencyInUSDC
    }
    return undefined;
  }

  return {
    currency, getPriceInUSDC, getPriceInCurrency
  }
}