import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useVirtual } from 'react-virtual';

import { SearchIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Box,
  Flex,
  ModalFooter,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

import { Token } from 'src/domain/chain/types';

import TokenItem from './TokenItem';

interface Props {
  headerTitle: string;
  isOpen: boolean;
  onClose: () => void;
  tokenList: Token[];
  onSelectItem: (token: Token) => void;
}

const TokenSelectDialog = ({ headerTitle, isOpen, onClose, tokenList, onSelectItem }: Props) => {
  const [query, setQuery] = useState<string | undefined>();
  const [filteredTokenList, setFilteredTokenList] = useState(tokenList);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const virtualizer = useVirtual({
    size: filteredTokenList.length,
    parentRef: containerRef,
    estimateSize: useCallback(() => 64, []),
    overscan: 30,
  });

  useEffect(() => {
    if (!query) return;
    setFilteredTokenList(
      tokenList.filter(
        token =>
          token.symbol.toUpperCase().includes(query.toUpperCase()) ||
          token.name.toUpperCase().includes(query.toUpperCase()),
      ),
    );
  }, [query]);

  useEffect(() => {
    setFilteredTokenList(tokenList);
  }, [tokenList]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setQuery('');
        setFilteredTokenList(tokenList);
        onClose();
      }}
      size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{headerTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup>
            <Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              size="lg"
              placeholder="Search with symbol, name or address"
              autoFocus
            />
            <InputRightElement height="100%">
              <Box alignSelf="center" justifySelf="center">
                <SearchIcon w={4} h={4} />
              </Box>
            </InputRightElement>
          </InputGroup>
          <Box h={8} />
          <Flex ref={containerRef} flexDirection="column" overflow="auto" maxH="70vh">
            <Box
              style={{
                height: `${virtualizer.totalSize}px`,
                width: '100%',
                position: 'relative',
              }}>
              {virtualizer.virtualItems.map(vRow => {
                const token = filteredTokenList[vRow.index];
                return (
                  <div
                    key={token.address}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${vRow.size}px`,
                      transform: `translateY(${vRow.start}px)`,
                    }}>
                    <TokenItem
                      onClick={() => {
                        onSelectItem({ ...token });
                        setQuery('');
                        setFilteredTokenList(tokenList);
                        onClose();
                      }}
                      {...token}
                    />
                  </div>
                );
              })}
            </Box>
          </Flex>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default TokenSelectDialog;
