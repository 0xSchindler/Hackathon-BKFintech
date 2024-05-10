import { createContext, useContext, useLayoutEffect, useState } from 'react';
import { IContextReturnData, StateConnectWallet, TChain } from './types';
import { BaseContextProps, TNet } from 'src/global.config';
import { ContractAddress } from 'src/constants/contract-address/ContractAddress';
import { Chainconnected, DEFAULT_SMART_CONTRACT, LocalStorageKey, WalletConnected } from 'src/constants';
import useConnectOraichain from './hooks/cosmos-network/connect-oraichain/useConnectOraichain';
import useAssetTokenList from './useAssetTokenList';
import { IconBlockchain, IconOrai, SvgComponent } from 'src/assets/icon';
import { imagePath } from 'src/constants/imagePath';
import { TDataModalSelectWallet } from 'src/components/ModalSelectConnectWallet/ModalSelectConnectWallet';
import ModalSelectConnectWallet from 'src/components/ModalSelectConnectWallet/ModalSelectConnectWallet.1';
import { LocalStorage } from './utils';
import { TCosmosWallet } from './hooks/cosmos-network/type';

const TheContext = createContext({} as IContextReturnData);

// eslint-disable-next-line react-refresh/only-export-components
export const infoChainConnecting: { [k in Chainconnected]: { logoChain: SvgComponent; name: string; walletSupport: WalletConnected[]; type: TChain | null } } = {
    [Chainconnected.Oraichain]: {
        logoChain: IconOrai,
        name: 'Oraichain',
        walletSupport: [WalletConnected.Keplr, WalletConnected.Owallet, WalletConnected.Leap],
        type: 'COSMOS',
    },
    [Chainconnected.NoConnected]: {
        logoChain: IconBlockchain,
        name: 'No Chain Connected',
        walletSupport: [],
        type: null,
    },
};

// eslint-disable-next-line react-refresh/only-export-components
export const infoWalletConnecting: { [k in WalletConnected]: { logoWallet: string; name: string } } = {
    [WalletConnected.Keplr]: { logoWallet: imagePath.Logo_Keplr, name: 'Keplr Wallet' },
    [WalletConnected.Owallet]: { logoWallet: imagePath.Logo_Owallet, name: 'Owallet' },
    [WalletConnected.Leap]: { logoWallet: imagePath.Logo_Leap, name: 'Leap Wallet' },
    [WalletConnected.NoWallet]: { logoWallet: imagePath.Logo_UnknownWallet, name: 'No Wallet Selected' },
};

// eslint-disable-next-line react-refresh/only-export-components
export const chainSupportedInApp: Chainconnected[] = [
    Chainconnected.Oraichain,
];

// eslint-disable-next-line react-refresh/only-export-components
export const walletSupportedInApp: WalletConnected[] = [WalletConnected.Keplr, WalletConnected.Leap, WalletConnected.Owallet];

export function WalletProvider({ children }: BaseContextProps) {
    const [chainConnected, _setChainConnected] = useState<Chainconnected>(Chainconnected.Oraichain);
    const [walletConnected, _setWalletConnected] = useState<WalletConnected>(WalletConnected.Keplr);
    const ctrAddress = ContractAddress;
    const oraichain = useConnectOraichain('mainnet');
    const [isConnecting, setIsConnecting] = useState<boolean>(true);
    const [modal, setModal] = useState<TDataModalSelectWallet>({ open: false, chain: Chainconnected.Oraichain, isChangeSelectNetwork: false });

    const { assetTokens, assetInfo } = useAssetTokenList(ctrAddress, "mainnet");

    function setChainConnected(chain: Chainconnected) {
        _setChainConnected(() => {
            localStorage.setItem(LocalStorageKey.ChainConnected, chain);
            return chain;
        });
    }
    function setWalletConnected(wallet: WalletConnected) {
        localStorage.setItem(LocalStorageKey.WalletConnected, wallet);
        _setWalletConnected(wallet);
    }

    function revokeConnected() {
        setWalletConnected(WalletConnected.NoWallet);
    }

    function disconnectWallet() {
        revokeConnected();
        window.location.reload();
    }

    // TODO: function for modal select network =====================================================================
    function openModalSelectWallet(chain: Chainconnected, isChangeSelectNetwork: boolean = false) {
        setModal((prev: any) => {
            return {
                ...prev,
                isChangeSelectNetwork: isChangeSelectNetwork,
                open: true,
                chain: chain,
            };
        });
    }

    function closeModalSelectWallet() {
        setModal((prev: any) => {
            return {
                ...prev,
                open: false,
                isChangeSelectNetwork: false,
            };
        });
    }
    async function selectWalletOnModal(chain: Chainconnected, wallet: WalletConnected, isChangeSelectNetworkAction: boolean) {
        const response = await connectChainAndWallet(chain, wallet);
        if (response == StateConnectWallet.SUCCESS) {
            if (isChangeSelectNetworkAction) {
                oraichain.disconnectOraichain();
                setChainConnected(chain);
            }
            closeModalSelectWallet();
        }
    }
    //! end TODO=======================================================================================================================

    function getUserAddressConnecting() {
        const _chainConnected = localStorage.getItem(LocalStorageKey.ChainConnected);
        switch (_chainConnected) {
            case Chainconnected.Oraichain:
                return oraichain.address;
            default:
                return '';
        }
    }
    function getSmartWalletConnecting() {
        const _chainConnected = localStorage.getItem(LocalStorageKey.ChainConnected);
        switch (_chainConnected) {
            case Chainconnected.Oraichain:
                return {
                    smartWallet: oraichain.smartWallet,
                    isDefault: oraichain.isDefaultSmartContract,
                };
            default:
                return {
                    smartWallet: '',
                    isDefault: true,
                };
        }
    }

    async function selectNetworkChange(chainPendingConnect: Chainconnected) {
        const _walletConnected = LocalStorage.getWalletConnected();
        if (_walletConnected == null || !walletSupportedInApp.includes(_walletConnected)) {
            // TODO: if no walletConnected or data trong localStorage không hợp lệ, chuyển lại thành No WalletConnected, pass select network change, done
            setWalletConnected(WalletConnected.NoWallet); //
            setChainConnected(chainPendingConnect);
            return;
        }
        // TODO: if walletConnected = kelpr, owallet, leap, metamask, connectwallet => tức là đang có connect ví
        const newChain = infoChainConnecting[chainPendingConnect]; //! => chain mà user vừa chọn select switch sang => chain mới
        const oldChain = infoChainConnecting[chainConnected]; //! => chain đã connect rồi, đang được chọn rồi => chain cũ
        if (oldChain.type != newChain.type) {
            openModalSelectWallet(chainPendingConnect, true);
            return;
        }
    }

    async function connectChainAndWallet(chain: Chainconnected, wallet: WalletConnected): Promise<StateConnectWallet> {
        setIsConnecting(true);
        let stateResult;
        if (wallet == WalletConnected.NoWallet) {
            stateResult = StateConnectWallet.PENDING;
        }
        switch (chain) {
            case Chainconnected.NoConnected:
            case Chainconnected.Oraichain:
                if (infoChainConnecting[chain].walletSupport.includes(wallet)) {
                    const success = await oraichain.connect(wallet as TCosmosWallet);
                    if (success) {
                        setWalletConnected(wallet);
                        stateResult = StateConnectWallet.SUCCESS;
                    } else {
                        console.log('Connect oraichain error: ', oraichain.error);
                        stateResult = StateConnectWallet.FAIL;
                    }
                } else {
                    stateResult = StateConnectWallet.PENDING;
                }
                break;
            default:
                stateResult = StateConnectWallet.PENDING;
        }
        setIsConnecting(false);
        return stateResult;
    }

    // TODO: function for init web app load =====================================================================
    async function initWebConnect() {
        let chain = LocalStorage.getChainConnected();
        let wallet = LocalStorage.getWalletConnected();

        if (chain == null || !chainSupportedInApp.includes(chain)) {
            localStorage.setItem(LocalStorageKey.ChainConnected, Chainconnected.Oraichain);
            chain = Chainconnected.Oraichain;
        }
        setChainConnected(chain);

        if (wallet == null || !walletSupportedInApp.includes(wallet)) {
            localStorage.setItem(LocalStorageKey.WalletConnected, WalletConnected.NoWallet);
            wallet = WalletConnected.NoWallet;
            setWalletConnected(wallet);
        } else {
            const connectState = await connectChainAndWallet(chain, wallet);
            if (connectState == StateConnectWallet.PENDING) {
                setWalletConnected(WalletConnected.NoWallet);
            }
        }

        setIsConnecting(false);
    }

    useLayoutEffect(() => {
        initWebConnect();
    }, []);

    return (
        <TheContext.Provider
            value={{
                chainConnected,
                walletConnected,
                oraichain,
                ctrAddress,
                assetTokens,
                assetInfo,
                isConnecting,
                modal,
                disconnectWallet,
                revokeConnected,
                getUserAddressConnecting,
                getSmartWalletConnecting,
                selectNetworkChange,
                openModalSelectWallet,
                connectChainAndWallet,
            }}
        >
            <ModalSelectConnectWallet {...modal} closeModal={closeModalSelectWallet} selectWalletToConnect={selectWalletOnModal} />
            {children}
        </TheContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useWalletContext = () => useContext(TheContext);
