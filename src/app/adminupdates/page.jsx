'use server';
import React from 'react';
// import { MdError } from "react-icons/md";
import styles from './adminupdates.module.css';
import UpdateAdmin from '@/components/portal/updateAdmin/UpdateAdmin';
import { auth } from '@/lib/auth';

const page = async() => {

  const session = await auth();

  return (
    <div className={styles.container}>
      <div className={styles.bread_crumb}>
        <a className={styles.home_crumb} href='/admin'><span>Admin</span></a> <span>/</span> <span>Updates</span>
      </div>
      <UpdateAdmin session={session}/>
    </div>
  )
}

export default page;
