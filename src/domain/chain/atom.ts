import { atom } from 'jotai';

import polygonTokenListJson from 'src/constant/token-list/polygon.json';

import { tokenInAddressAtom, tokenOutAddressAtom } from '../swap/atom';
import { Chain, Token } from './types';

// @ts-expect-error restore after polygon hackathon release
const tokenListMap: Record<Chain, Token[]> = {
  polygon: polygonTokenListJson.result,
};

export const chainList: Chain[] = ['polygon'];

export const defaultChain: Chain = 'polygon';
export const defaultTokenList: Token[] = tokenListMap[defaultChain];

export const chainAtom = atom<Chain>(defaultChain);

export const tokenListAtom = atom<Token[], Token[]>(
  get => {
    const chain = get(chainAtom);
    return tokenListMap[chain];
  },
  (_, set, updated) => {
    // TODO: not working. chain이 변경 되었을 때 tokenInAddressAtom, tokenOutAddressAtom 초기화 필요
    set(tokenInAddressAtom, updated[0].address);
    set(tokenOutAddressAtom, updated[1].address);
  },
);
