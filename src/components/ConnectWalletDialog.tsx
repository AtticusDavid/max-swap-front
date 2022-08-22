import React, { useEffect, useState } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalFooter,
  useToast,
  Box,
} from '@chakra-ui/react';
import Image from 'next/image';

import MetaMaskLogoImg from 'public/metamask-logo.svg';
import { useWallet } from 'src/hooks/useWallet';
import { logger } from 'src/utils/logger';
import { WALLET_TYPES } from 'src/utils/wallet';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}


const ConnectWalletDialog = ({ isOpen, onClose }: Props) => {
  const toast = useToast();
  const { connect, address, getBalance } = useWallet();

  const [hasReadRiskDocument, setHasReadRiskDocument] = useState(false);

  useEffect(() => {
    if (!address) return;
    getBalance().then(res => logger.log('getBalance', res));
  }, [address]);

  const handleClick = (type: ValueOf<typeof WALLET_TYPES>) => async () => {
    const success = await connect(type);

    if (!success) {
      onClose();
      toast({
        title: 'Failed to connect your wallet',
        description: 'Sorry. Someting went wrong, please try again',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connect Your Wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mt={4}>
            <Button
              onClick={handleClick('metamask')}
              variant="outline"
              size="lg"
              isFullWidth
              leftIcon={<Image src={MetaMaskLogoImg} alt="123" width={32} height={32} />}>
              Metamask
            </Button>
          </Box>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default ConnectWalletDialog;
