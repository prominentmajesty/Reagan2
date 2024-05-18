'use client';
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';
import Unqualified from '../unqualified/Unqualified';
import SuspenseWork from '../suspense/Suspense';

function Admin({session}) {

    const router = useRouter();
    const [state, setState] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
          const response = await fetch(`/api/user/${session?.user.email}/details`);
          const data = await response.json();
          setState(data);
        }
    
        if (session?.user.id) fetchDetails();
    },[session?.user.id]);

    useEffect(() => {
      !session ? router.push('/') : console.log('');
    }, []);

    console.log(state);

  return (
    state ? 
      <>
        {state[0].isAdmin ? 
          <>
            <div className={styles.parent}>
              <div className={styles.bread_crumb}>
                  <span className={styles.home_crumb} onClick={() => {router.push('/')}}>Home</span> <span>/</span> <span>Admin</span>
              </div>
              <div className={styles.container}>
                <h4 className={styles.caption}>{`Welcome ${state[0].email} Admin.`}</h4>
              </div>
              <div className={`${styles.admin}`}>
              <div onClick={() => {router.push('/adminstudent')}} className={`${styles.students} ${styles.general}`}><h4 className={styles.labels}>Students</h4></div>
              <div onClick={() => {router.push('/adminteacher')}} className={`${styles.teachers} ${styles.general}`}><h4 className={styles.labels}>Teachers</h4></div>
              <div onClick={() => {router.push('/adminparents')}} className={`${styles.parents} ${styles.general}`}><h4 onClick={() => {router.push('/adminparents')}} className={styles.labels}>Parents</h4></div>
              <div onClick={() => {router.push('/adminupdates')}} className={`${styles.update} ${styles.general}`}><h4 onClick={() => {router.push('/adminupdates')}} className={styles.labels}>Updates</h4></div>
              </div>
            </div>
          </>
          :
          <>
            <Unqualified />
          </>
        }
      </>
    : <SuspenseWork />
  );
};

export default Admin;
        