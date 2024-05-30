interface Currency {}
interface BIP44 {}
interface Bech32Config {}
interface AppCurrency{}
interface FeeCurrency{}

export interface ChainInfoInterface {
    readonly rpc: string;
    readonly wss: string;
    readonly rest: string;
    readonly chainId: string;
    readonly chainName: string;
    /**
    * This indicates the type of coin that can be used for stake.
    * You can get actual currency information from Currencies.
    */
    readonly stakeCurrency: Currency;
    readonly walletUrlForStaking?: string;
    readonly bip44: {
        coinType: number;
    };
    readonly alternativeBIP44s?: BIP44[];
    readonly bech32Config: Bech32Config;
    
    readonly currencies: AppCurrency[];
    /**
    * This indicates which coin or token can be used for fee to send transaction.
    * You can get actual currency information from Currencies.
    */
    readonly feeCurrencies: FeeCurrency[];
    
    /**
    * Indicate the features supported by this chain. Ex) cosmwasm, secretwasm ...
    */
    readonly features?: string[];
}
