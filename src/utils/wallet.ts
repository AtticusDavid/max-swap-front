import { logger } from './logger';

export const WALLET_TYPES = {
  KAIKAS: 'kaikas' as const,
  METAMASK: 'metamask' as const,
};

export interface Wallet {
  type: ValueOf<typeof WALLET_TYPES>;
  address: string;
}

export interface TransactionParams {
  gasPrice?: string;
  gas: string;
  to: string;
  from: string;
  value: string;
  data: string;
}

export interface WalletExtension {
  connect: () => Promise<Wallet | undefined>;
  getBalance: (address: string) => Promise<unknown>;
  isValid?: (address: string, ...args: any) => Promise<boolean>;
  isActive?: (address: string, ...args: any) => Promise<boolean>;
  sendTransaction?: (params: TransactionParams) => Promise<unknown>;
}

export class WalletExtensionFactory {
  private type: ValueOf<typeof WALLET_TYPES>;

  constructor(type: ValueOf<typeof WALLET_TYPES>) {
    this.type = type;
  }

  createWalletExtension() {
    switch (this.type) {
      case 'metamask':
        return new Metamask();
      case 'kaikas':
        return new Kaikas();
      default:
        return undefined;
    }
  }
}
export class Kaikas implements WalletExtension {
  async connect() {
    if (typeof window.klaytn === undefined) return;
    try {
      const res = await window.klaytn.enable();
      return {
        type: WALLET_TYPES.KAIKAS,
        address: res[0],
      };
    } catch (e) {
      logger.error(e);
      return undefined;
    }
  }

  /**
   *
   * @param address kaikas 지갑 주소
   * @returns unit: peb = 10^(-18) KLAY
   */
  async getBalance(address: string) {
    return new Promise((resolve, reject) => {
      window.klaytn.sendAsync(
        {
          method: 'klay_getBalance',
          params: [address, 'latest'],
        },
        (err: Error, something?: { result?: unknown }) => {
          if (err) {
            reject(err);
            return;
          }

          if (!something?.result) {
            reject(new Error('Transaction cancelled'));
            return;
          }

          resolve(something?.result);
        },
      );
    });
  }

  async sendTransaction() {
    // TODO: implement
  }
}

export class Metamask implements WalletExtension {
  async connect() {
    if (typeof window.ethereum === undefined) return;
    try {
      const res = await window.ethereum.request<string[]>({
        method: 'eth_requestAccounts',
      });

      if (!res) return;
      if (!Array.isArray(res) || res.length === 0) return;
      if (!res[0]) return;

      return {
        type: WALLET_TYPES.METAMASK,
        address: res[0],
      };
    } catch (e) {
      logger.error(e);
      return undefined;
    }
  }

  /**
   *
   * @param address 지갑(metamask)의 address
   * @returns
   */
  async getBalance(address: string) {
    return window.ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });
  }

  async sendTransaction(params: TransactionParams): Promise<string | undefined | null> {
    // https://docs.metamask.io/guide/sending-transactions.html
    return window.ethereum.request<string>({
      method: 'eth_sendTransaction',
      params: [params],
    })
  };
}
