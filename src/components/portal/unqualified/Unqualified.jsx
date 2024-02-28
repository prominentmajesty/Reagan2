import React from 'react';
import Link from 'next/link';
import styles from './unqualified.module.css';

const Unqualified = () => {
  return (
    <div className={styles.unqualified}>
      <h4 className={styles.h4}><b className={styles.bold}>OOPS...!!</b><br/> You are not authorized to view this page.<br/><Link href='/'>Back to Home.</Link></h4>
    </div>
  )
}

export default Unqualified
