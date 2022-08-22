import React, { useRef } from 'react';

import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Link,
  Spacer,
  Switch,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';

import { chainAtom } from 'src/domain/chain/atom';
import { useWallet } from 'src/hooks/useWallet';
import { logger } from 'src/utils/logger';

import ConnectWalletDialog from './ConnectWalletDialog';

const ServiceName = 'MaxSwap';

const pages: { href: string; text: string }[] = [];

const NavigationBar = () => {
  const router = useRouter();

  const { type: walletType, address, disconnect } = useWallet();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const [isSmallerThan768] = useMediaQuery('(max-width: 768px)');

  const drawerButtonRef = useRef<HTMLButtonElement | null>(null);

  const [chain, setChain] = useAtom(chainAtom);
  logger.debug(chain);

  return (
    <>
      <header>
        {isSmallerThan768 ? (
          <>
            <Flex alignItems="center" padding={4}>
              <Heading as="h1" size="xl">
                {ServiceName}
              </Heading>
              <Spacer />
              <IconButton
                ref={drawerButtonRef}
                onClick={onDrawerOpen}
                variant="ghost"
                size="lg"
                icon={<HamburgerIcon w={8} h={8} />}
                aria-label="open drawer navigation"
              />
            </Flex>

            <Drawer
              isOpen={isDrawerOpen}
              placement="right"
              onClose={onDrawerClose}
              finalFocusRef={drawerButtonRef}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Max Swap</DrawerHeader>

                <DrawerBody>
                  <nav>
                    <Flex flexDirection="column" rowGap={6}>
                      {pages.map((page, idx) => (
                        <Link
                          key={idx}
                          href={page.href}
                          fontSize="lg"
                          fontWeight="500"
                          color={router.pathname === page.href ? '' : 'blueGray.500'}>
                          {page.text.toUpperCase()}
                        </Link>
                      ))}
                    </Flex>
                  </nav>
                </DrawerBody>
                <DrawerFooter>
                  <HStack>
                    <Text
                      fontSize="md"
                      fontWeight="700"
                      whiteSpace="nowrap"
                      textAlign="left"
                      marginRight={2}>
                      {!address
                        ? 'Connect Wallet'
                        : `${address.substring(0, 6)}...${address.slice(-4)}`}
                    </Text>
                    <Switch
                      isChecked={!!walletType}
                      onChange={e => {
                        if (!walletType) {
                          onOpen();
                          return;
                        }
                        disconnect();
                        onDrawerClose();
                      }}
                      size="lg"
                      colorScheme="secondary"
                    />
                  </HStack>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <Grid h={24} templateColumns="repeat(12, 1fr)" gap={6} alignItems="center" px={12}>
            <GridItem colStart={1} colEnd={4}>
              <Heading as="h1" size="xl">
                {ServiceName}
              </Heading>
            </GridItem>

            <GridItem colStart={4} colEnd={8}>
              <nav>
                <Flex columnGap={6} marginLeft={8}>
                  {pages.map((page, idx) => (
                    <Link
                      key={idx}
                      href={page.href}
                      fontSize={['md', 'md', 'lg', 'xl']}
                      fontWeight="500"
                      color={router.pathname === page.href ? '' : 'blueGray.500'}>
                      {page.text.toUpperCase()}
                    </Link>
                  ))}
                </Flex>
              </nav>
            </GridItem>
            <GridItem colStart={11} colEnd={13} justifySelf="end">
              <HStack>
                <Text
                  color="blueGray.100"
                  fontSize="lg"
                  fontWeight="700"
                  whiteSpace="nowrap"
                  marginRight={2}>
                  {!address
                    ? 'Connect Wallet'
                    : `${address.substring(0, 6)}...${address.slice(-4)}`}
                </Text>
                <Switch
                  isChecked={!!walletType}
                  onChange={e => {
                    if (!walletType) {
                      onOpen();
                      return;
                    }
                    disconnect();
                  }}
                  size="lg"
                  colorScheme="secondary"
                />
              </HStack>
            </GridItem>
          </Grid>
        )}

        <ConnectWalletDialog isOpen={isOpen} onClose={onClose} />
      </header>
    </>
  );
};

export default NavigationBar;
