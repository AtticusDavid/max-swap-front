import type { NextPage } from 'next';

import IDOFormCard from 'src/components/IDOFormCard';
import PromotionInfoCard from 'src/components/PromotionInfoCard';

import styles from './Ido.module.css';

const IDO: NextPage = () => {
  return (
    <main className={styles.main}>
      <IDOFormCard />
      <PromotionInfoCard />
    </main>
  );
};

export default IDO;
