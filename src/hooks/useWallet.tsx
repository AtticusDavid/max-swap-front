import {
  useCallback,
  useEffect,
} from 'react';

import { atom, useAtom } from 'jotai';
import { atomWithReducer } from 'jotai/utils';

import { keyMap } from 'src/constant/storage-key';
import { TransactionParams, WalletExtensionFactory, WALLET_TYPES } from 'src/utils/wallet';

interface WalletState {
  type?: ValueOf<typeof WALLET_TYPES>;
  address?: string;
  requestedWalletType?: ValueOf<typeof WALLET_TYPES>;
}


const initialWalletState: WalletState = {
  type: undefined,
  address: undefined,
};

export const wallStateAtom = atom(initialWalletState);

const CONNECT_WALLET_ACTION = '@wallet/connect';
interface ConnectWalletAction {
  type: typeof CONNECT_WALLET_ACTION;
  payload: {
    requestedWalletType: ValueOf<typeof WALLET_TYPES>;
  };
}

const CONNECT_WALLET_SUCCESS_ACTION = '@wallet/connect-success';
interface ConnectWalletSuccessAction {
  type: typeof CONNECT_WALLET_SUCCESS_ACTION;
  payload: WalletState;
}

/**
 * TODO: local storage에서 remove,
 * state에서 type, address 비우기
 */
const DISCONNECT_WALLET_ACTION = '@wallet/disconnect';
interface DisconnectWalletAction {
  type: typeof DISCONNECT_WALLET_ACTION;
}

type WalletAction = ConnectWalletAction | ConnectWalletSuccessAction | DisconnectWalletAction;

const walletReducer = (state = initialWalletState, action: WalletAction): WalletState => {
  switch (action.type) {
    case CONNECT_WALLET_ACTION:
      return {
        ...state,
        requestedWalletType: action.payload.requestedWalletType,
      };
    case CONNECT_WALLET_SUCCESS_ACTION:
      return { ...action.payload, requestedWalletType: undefined };
    case DISCONNECT_WALLET_ACTION:
      return initialWalletState;
    default:
      return state;
  }
};

export const wallReducerAtom = atomWithReducer(initialWalletState, walletReducer);

export const useWallet = () => {
  const [state, dispatch] = useAtom(wallReducerAtom);

  const connect = useCallback(
    async (requestWalletType: ValueOf<typeof WALLET_TYPES>) => {
      const walletExtensionFactory = new WalletExtensionFactory(requestWalletType);
      const walletExtension = walletExtensionFactory.createWalletExtension();
      if (!walletExtension) return;

      const res = await walletExtension?.connect();
      if (!res) return;

      dispatch({ type: CONNECT_WALLET_SUCCESS_ACTION, payload: res });

      if (typeof window.localStorage === undefined) return;
      localStorage.setItem(keyMap.LAST_CONNECTED_WALLET_TYPE, res.type);

      return true;
    },
    [dispatch],
  );

  const disconnect = useCallback(() => {
    dispatch({ type: DISCONNECT_WALLET_ACTION });
    if (typeof window.localStorage === undefined) return;
    localStorage.removeItem(keyMap.LAST_CONNECTED_WALLET_TYPE);
  }, [state]);

  const getBalance = useCallback(async () => {
    if (!state.type || !state.address) return;

    const walletExtensionFactory = new WalletExtensionFactory(state.type);
    const walletExtension = walletExtensionFactory.createWalletExtension();

    if (!walletExtension) return;

    return walletExtension.getBalance(state.address);
  }, [state.type, state.address]);

  const sendTransaction = useCallback((params: TransactionParams) => {
    if (!state.type || !state.address) return;

    const walletExtensionFactory = new WalletExtensionFactory(state.type);
    const walletExtension = walletExtensionFactory.createWalletExtension();

    if (!walletExtension) return;

    return walletExtension.sendTransaction(params)
  }, [state.address, state.type])

  useEffect(() => {
    if (typeof window.localStorage === undefined) return;
    const lastConnectedWalletType = localStorage.getItem(keyMap.LAST_CONNECTED_WALLET_TYPE);

    if (!lastConnectedWalletType) return;
    connect(lastConnectedWalletType as ValueOf<typeof WALLET_TYPES>);
  }, []);

  return { ...state, connect, disconnect, getBalance, sendTransaction };
};
