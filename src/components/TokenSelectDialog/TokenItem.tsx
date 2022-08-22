import React from 'react';

import { Flex, Avatar, Box, Text, useTheme } from '@chakra-ui/react';

import { Token } from 'src/domain/chain/types';

interface Props extends Token {
  onClick: () => void;
}

const BASE_URL = 'https://static.eisenfinance.com/tokens';

const TokenItem = ({ address, name, symbol, iconFileExtension, logoURI, onClick }: Props) => {
  const theme = useTheme();

  return (
    <Box
      as="button"
      onClick={onClick}
      width="100%"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1), "
      borderRadius="4px"
      paddingX={2}
      fontSize="14px"
      fontWeight="semibold"
      color={theme.colors.blueGray[100]}
      _hover={{ bg: theme.colors.primary[100], color: theme.colors.blueGray[800] }}
      _active={{
        bg: theme.colors.primary[400],
        transform: 'scale(0.98)',
        color: theme.colors.blueGray[900],
      }}>
      <Flex py={2}>
        {
          <Avatar
            src={iconFileExtension ? `${BASE_URL}/${address}/icon.${iconFileExtension}` : logoURI}
          />
        }
        <Box marginLeft={4}>
          <Text fontWeight="bold" textAlign="left">
            {`${name} (${symbol})`}
          </Text>
          <Text isTruncated textAlign="left">
            {address}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default React.memo(TokenItem);
