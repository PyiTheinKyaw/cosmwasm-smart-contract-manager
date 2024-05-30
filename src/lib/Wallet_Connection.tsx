import React, { useEffect, useState } from 'react';
import { SigningArchwayClient } from '@archwayhq/arch3.js';

import {ChainInfoInterface} from './interface/ChainInfo';

// Declare the type for the Keplr wallet object
declare global {
    interface Window {
        keplr?: {
            experimentalSuggestChain: (chainInfo: ChainInfoInterface ) => any;
            enable: (chainId: string) => any;
            defaultOptions?: {
              sign?: {
                preferNoSetFee?: boolean;
              };
            };
        };

        getOfflineSignerAuto: (chainId: string) => any;
    }
}

const ChainInfo = {
    chainId: 'constantine-3',
    chainName: 'Constantine Testnet',
    rpc: 'https://rpc.constantine.archway.io',
    wss: 'wss://rpc.constantine.archway.io:443/websocket',
    rest: 'https://api.constantine.archway.io',
    stakeCurrency: { coinDenom: 'CONST', coinMinimalDenom: 'aconst', coinDecimals: 18 },
    bip44: { coinType: 118 },
    bech32Config: {
      bech32PrefixAccAddr: 'archway',
      bech32PrefixAccPub: 'archwaypub',
      bech32PrefixValAddr: 'archwayvaloper',
      bech32PrefixValPub: 'archwayvaloperpub',
      bech32PrefixConsAddr: 'archwayvalcons',
      bech32PrefixConsPub: 'archwayvalconspub',
    },
    currencies: [{ coinDenom: 'CONST', coinMinimalDenom: 'aconst', coinDecimals: 18 }],
    feeCurrencies: [{ coinDenom: 'CONST', coinMinimalDenom: 'aconst', coinDecimals: 18 }],
    coinType: 118,
    gasPriceStep: { low: 0, average: 0.1, high: 0.2 },
    features: ['cosmwasm'],
};

let accounts, CosmWasmClient, queryHandler;

interface WalletConnectionProps {
  onConnection: (value: boolean) => void;
}

const WalletConnection: React.FC<WalletConnectionProps> = ({ onConnection }) => {

  useEffect(() => {
    const connectToWallet = async () => {
      if (window.keplr && window.keplr['experimentalSuggestChain']) {
        try {
            await window.keplr.experimentalSuggestChain(ChainInfo);
            await window.keplr.enable(ChainInfo.chainId);

            window.keplr.defaultOptions = {
                sign: {preferNoSetFee: true}
            }

            const offlineSigner = await window.getOfflineSignerAuto(ChainInfo.chainId);
            CosmWasmClient = await SigningArchwayClient.connectWithSigner(ChainInfo.rpc, offlineSigner)

            accounts = await offlineSigner.getAccounts();

            let wallet_info =  {
              offlineSigner: offlineSigner,
              CosmWasmClient: CosmWasmClient,
              accounts: accounts,
              ChainInfo: ChainInfo
            }

            localStorage.setItem("wallet_info", JSON.stringify(wallet_info));
            onConnection(true);
        } catch (error) {
          console.error('Error connecting to Kepler wallet:', error);
        }
      }
      else {
        console.error('Please install keplr wallet');
      }
    };

    connectToWallet();
  }, []);

  return (<></>);
};

export default WalletConnection;
