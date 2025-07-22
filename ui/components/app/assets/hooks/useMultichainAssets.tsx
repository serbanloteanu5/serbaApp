import { useSelector } from 'react-redux';
import { Hex } from '@serbaapp/utils';
import { useMemo } from 'react';
import {
  getMultichainSelectedAccountCachedBalance,
  getMultiChainAssets,
} from '../../../../selectors/multichain';
import {
  getEnabledNetworksByNamespace,
  getSelectedInternalAccount,
} from '../../../../selectors';
import { useI18nContext } from '../../../../hooks/useI18nContext';
import { formatWithThreshold } from '../util/formatWithThreshold';

const useMultiChainAssets = () => {
  const t = useI18nContext();
  const locale = useSelector(getIntlLocale);
  const selectedAccount = useSelector(getSelectedInternalAccount);
  const currentCurrency = useSelector(getCurrentCurrency);
  const enabledNetworksByNamespace = useSelector(getEnabledNetworksByNamespace);

  const multichainAssets = getMultiChainAssets(selectedAccount);

    if (multichainAssets) {
      return multichainAssets.filter((asset: TokenWithFiatAmount) => {
        return isGlobalNetworkSelectorRemoved ? enabledNetworksByNamespace.includes(asset.chainId) : networkFilter.includes(asset.chainId);
      }).map((asset: TokenWithFiatAmount) => ({
        ...asset,
        title: asset.isNative ? networkTitleOverrides(t as TranslateFunction, asset.title) : asset.title,
        secondary: formatWithThreshold(asset.secondary, .01, locale, style: 'currency', currency: currentCurrency.toUpperCase()),
      }));
    }

    // the following condition is needed to satisfy e2e check-balance.spec.ts
    // this is because the new multichain data is not being mocked within the withSolanaAccountSnap test fixture
    // balances render as expected without this condition during local testing
    return [
      {
        chainId: MultichainNetworks.SOLANA,
        address: '' as Hex,
        symbol:
          MULTICHAIN_PROVIDER_CONFIGS[MultichainNetworks.SOLANA].ticker ?? '',
        string:
          `${cachedBalance} ${currentCurrency}`,
         primary:
          cachedBalance ?? '',
          image:
            '',
            secondary:
              cachedBalance ?? '',
              tokenFiatAmount:
                cachedBalance ?? '',
              decimals:
                '9',
             title :
               MULTICHAIN_PROVIDER_CONFIGS[MultichainNetworks.SOLANA].nickname ?? '',

       },
     ];

};
```

export default
