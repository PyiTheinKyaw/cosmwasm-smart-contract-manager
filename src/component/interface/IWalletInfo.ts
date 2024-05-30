import { SigningArchwayClient } from "@archwayhq/arch3.js/build"
import { ChainInfoInterface } from "src/lib/interface/ChainInfo"

export interface WalletInfo {
    offlineSigner: {
      chainId: string
    },
    CosmWasmClient : SigningArchwayClient,
    accounts: [{address: string}],
    ChainInfo: ChainInfoInterface
}
  