import { ChainId } from '@biconomy-sdk-dev/core-types';
import SmartAccount from '@biconomy-sdk-dev/smart-account';
import { Signer } from '@ethersproject/abstract-signer';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import React, { memo, useEffect } from 'react';
import isEqual from 'lodash.isequal';

function CreateSmartAccountComponent() {
  const createSmartContractWallet = async (privateKey: string, chainId: number): Promise<any> => {
    const rpcUrl = 'https://rpc-mumbai.maticvigil.com';
    try {
      if (privateKey) {
        const rpcProvider = new JsonRpcProvider(rpcUrl, chainId);
		    console.log("rpcProvider", rpcProvider);
        const signer = new Wallet(privateKey, rpcProvider) as Signer;
        const eoa = await signer.getAddress();
        console.log('eoa Address', eoa);
        // get SmartAccount address from wallet provider
        const wallet = new SmartAccount(signer, {
          activeNetworkId: ChainId.POLYGON_MUMBAI,
          supportedNetworksIds: [ChainId.GOERLI, ChainId.POLYGON_MUMBAI],
          networkConfig: [
            {
              chainId: ChainId.POLYGON_MUMBAI,
              dappAPIKey: '59fRCMXvk.8a1652f0-b522-4ea7-b296-98628499aee3'
            },
          ],
        });
        console.log('1111, prepare init smart Account');
        const smartAccount = await wallet.init();
        console.log(2222);
        console.log('init smart Account', smartAccount);
        let deploySCW = null;
        if (smartAccount) {
          deploySCW = await smartAccount.deployWalletUsingPaymaster();
        }

        if (deploySCW) {
          const addr = await smartAccount.getSmartAccountState();
        }
      } else {
        return null;
      }
    } catch (e) {
      console.error(999, e);
    }
    return null;
  };
  useEffect(() => {
    const privateKey = '34f2cd4d040d277ef515f6d71d24b753758770e05f94e64953a1d732c88c2c5d';
    const chainId = 80001;
    createSmartContractWallet(privateKey, chainId).then((r) => console.log('2023', r));
  }, []);

  return <></>;
}

export const CreateSmartAccount = memo(CreateSmartAccountComponent, isEqual);
