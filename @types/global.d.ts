import { MetaMaskInpageProvider } from '@metamask/providers';

export {};

declare global {
  interface Window {
    klaytn: Klaytn;
    ethereum: MetaMaskInpageProvider;
  }

  type ValueOf<T> = T[keyof T];
}
