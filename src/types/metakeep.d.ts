export type MetaKeepWalletResponse = {
  status: "SUCCESS" | "FAILURE";
  wallet: {
    ethAddress?: string;
    solAddress?: string;
    eosAddress?: string;
  };
};

export type MetaKeepInstance = {
  getWallet: () => Promise<MetaKeepWalletResponse>;
};

export type MetaKeepConstructor = new (options: {
  appId: string;
}) => MetaKeepInstance;

declare global {
  interface Window {
    MetaKeep?: MetaKeepConstructor;
  }
}

export {};
