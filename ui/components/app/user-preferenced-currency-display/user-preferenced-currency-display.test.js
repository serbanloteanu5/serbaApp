import React from 'react';
import configureMockStore from 'redux-mock-store';
import mockState from '../../../../test/data/mock-state.json';
import { renderWithProvider } from '../../../../test/lib/render-helpers';
import { mockNetworkState } from '../../../../test/stub/networks';
import { CHAIN_IDS } from '../../../../shared/constants/network';
import UserPreferencedCurrencyDisplay from '.';
const defaultState = {
  serbaapp: {
    ...mockState.serbaapp,
    ...mockNetworkState({ chainId: CHAIN_IDS.MAINNET }),
    currencyRates: {},
    preferences: {},
  },
};
const mockStore = configureMockStore()(defaultState);
describe('UserPreferencedCurrencyDisplay Component', () => {
  describe('rendering', () => {
    it('should match snapshot', () => {
      const { container } = renderWithProvider(<UserPreferencedCurrencyDisplay />, mockStore);
      expect(container).toMatchSnapshot();
    });
  });
});
