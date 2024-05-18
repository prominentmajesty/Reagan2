import React from 'react';
import styles from './adminteacher.module.css';
import TeacherAdmin from '@/components/portal/teacherAdmin/TeacherAdmin';
import { auth } from '@/lib/auth';

const page = async() => {

  const session = await auth();

  return (
    <>
      <div className={styles.bread_crumb}>
        <a className={styles.home_crumb} href='/admin'><span>Admin</span></a><span>/</span> <span>Teacher</span>
      </div>
      <TeacherAdmin session={session}/>
    </>
  )
}

export default page;
