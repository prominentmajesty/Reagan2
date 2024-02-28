import React from 'react';
import styles from './suspense.module.css'

const SuspenseWork = () => {
  return (
    <div className={styles.loading}>
        <h2 className={styles.h4Loading}>Loading...</h2>
    </div>
  )
}

export default SuspenseWork;
