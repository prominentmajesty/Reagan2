'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';

function Admin({session}) {

    const router = useRouter();

  return (
    <div className={styles.parent}>
        <div className={styles.bread_crumb}>
            <span className={styles.home_crumb} onClick={() => {router.push('/')}}>Home</span> <span>/</span> <span>Admin</span>
        </div>
        <div className={styles.container}>
          <h4 className={styles.caption}>Welcome Abas Admin.., Select any of the features below to work on.</h4>
        </div>
        <div className={`${styles.admin}`}>
        <div className={`${styles.students} ${styles.general}`}><h4 className={styles.labels}>Students</h4></div>
        <div className={`${styles.teachers} ${styles.general}`}><h4 className={styles.labels}>Teachers</h4></div>
        <div className={`${styles.parents} ${styles.general}`}><h4 className={styles.labels}>Parents</h4></div>
        <div className={`${styles.update} ${styles.general}`}><h4 className={styles.labels}>Updates</h4></div>
        </div>
    </div>
  )
}

export default Admin;
        