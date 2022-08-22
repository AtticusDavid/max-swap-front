import { NextPage } from 'next';

import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button, Stack, Text } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';

import seoConfig from 'next-seo.config';

import styles from './index.module.scss';

const Custom404: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <DefaultSeo {...seoConfig} />
      <main className={styles.main}>
        <Stack marginBottom={12}>
          <Text fontSize="7xl">404</Text>
          <Text fontSize="xl">Oops! </Text>
          <Text fontSize="xl">Page Not Found</Text>
        </Stack>

        <Button
          variant="outline"
          colorScheme="blueGray"
          onClick={router.back}
          leftIcon={<ArrowBackIcon />}>
          Go Back
        </Button>
      </main>
    </>
  );
};

export default Custom404;
