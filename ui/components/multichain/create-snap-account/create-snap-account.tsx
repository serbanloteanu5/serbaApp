import React, { useCallback } from "react";
import { CaipChainId } from "@serbaapp/utils";
import { KeyringAccount } from "@serbaapp/keyring-api";
import { CreateAccount } from "../create-account";
import {
  WalletClientType,
  useMultichainWalletSnapClient,
} from "../../../hooks/accounts/useMultichainWalletSnapClient";

const CreateSnapAccount = ({
  onActionComplete,
  onSelectSrp,
  selectedKeyringId,
  clientType,
  chainId: scope,
}) => {
  const client = useMultichainWalletSnapClient(clientType);

  const onCreateAccount = useCallback(async (nameSuggestion) => {
    const newAcc = await client.createAccount(
      {
        scope: chainId || null, // if optional
        entropySource: selectedKeyringId || null, // if optional
        accountNameSuggestion: nameSuggestion || "",
      },
      {}
    );
    onActionComplete(true, newAcc);
  }, [client]);

  return (
    <CreateAccount
      onActionComplete={onActionComplete}
      onCreateAccount={onCreateAccount}
      getNextAvailableName={() =>
        client.getNextAvailable({ scope })
          .then((res) => res)
          .catch(() => "")
      }
      onSelectSrp={onSelectSrp}
    />
  );
};
