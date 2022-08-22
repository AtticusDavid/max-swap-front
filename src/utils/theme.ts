import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  colors: {
    primary: {
      50: '#EAEAF5',
      100: '#CBCAE7',
      200: '#AAA8D6',
      300: '#8986C6',
      400: '#726BB9',
      500: '#5D50AC',
      600: '#5748A2',
      700: '#4E3E96',
      800: '#47348A',
      900: '#3A2174',
    },
    secondary: {
      50: '#FAECE9',
      100: '#FED4C3',
      200: '#FEB89C',
      300: '#FF9E74',
      400: '#FF8954',
      500: '#FF7634',
      600: '#F77030',
      700: '#E8682C',
      800: '#DB6128',
      900: '#C25320',
    },
    blueGray: {
      50: '#ECEFF1',
      100: '#CFD8DC',
      200: '#B0BEC5',
      300: '#90A4AE',
      400: '#78909C',
      500: '#607D8B',
      600: '#546E7A',
      700: '#455A64',
      800: '#37474F',
      900: '#263238',
    },
  },
});
