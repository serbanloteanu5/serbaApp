import cloneDeep from 'lodash/cloneDeep';
import { TransactionType } from '@serbaapp/transaction-controller';

const version = 53;

export default {
  version,
  async migrate(originalVersionedData) {
    const versionedData = cloneDeep(originalVersionedData);
    versionedData.meta.version = version;
    const state = versionedData.data;
    if (Array.isArray(state?.TransactionController?.transactions)) {
      state.TransactionController.transactions.forEach((tx) => {
        if (tx && tx.type !== TransactionType.retry && tx.type !== TransactionType.cancel) {
          tx.type = tx.transactionCategory;
        }
        delete tx.transactionCategory;
      });
    }
    const incomingTransactions = state?.IncomingTransactionsController?.incomingTransactions;
    if (incomingTransactions) {
      Object.entries(incomingTransactions).forEach(([key, tx]) => {
        if (tx) {
          delete tx.transactionCategory;
          state.IncomingTransactionsController.incomingTransactions[key] = { ...tx, type: TransactionType.incoming };
        }
      });
    }
    return versionedData;
  },
};
