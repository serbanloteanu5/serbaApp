import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, IconName } from '../../component-library';
import { useI18nContext } from '../../../hooks/useI18nContext';

export enum DisconnectType {
  Account = 'disconnectAllAccountsText',
  Snap = 'disconnectAllSnapsText',
}

export const DisconnectAllModal = ({ onClick, onClose }: { onClick: () => void; onClose: () => void }) => {
  const t = useI18nContext();

  return (
    <Modal isOpen onClose={onClose} data-testid="disconnect-all-modal">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader onClose={onClose}>{t('disconnect')}</ModalHeader>
        <ModalBody>
          <Text>{t('disconnectAllDescriptionText')}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onClick}
            startIconName={IconName.Logout}
            block
            danger
            data-testid="disconnect-all"
          >
            {t('disconnect')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
