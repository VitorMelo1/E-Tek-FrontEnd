import React from 'react';
import styles from './IntroSection.module.scss';
import EtekLogo from '../../assets/logo/EtekGreenLogo.png';

const IntroSection: React.FC = () => {
  return (
    <section className={`${styles.intro} ${styles.card}`}>
      <div className={styles.textContent}>
        <p>
          It’s not just technology.<br />
          It’s attitude turned into product.<br />
          (E-TEK = personality + power).
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>View Products</button>
      </div>
      <div className={styles.logoWrapper}>
        <img src={EtekLogo} alt="E-TEK Logo" className={styles.logoGlow} />
      </div>
    </section>
  );
};

export default IntroSection;
