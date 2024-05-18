import React from 'react';
import { MdError } from "react-icons/md";
import styles from './adminstudent.module.css';
import TeacherAdmin from '@/components/portal/teacherAdmin/TeacherAdmin';

function page() {
  return (
    <div className={styles.container}>
      <MdError size={85} className={styles.icon}/><h5 className={styles.text}><b>Oops..</b> Your database free trial version has expired and you will no longer be able to see the contents in this page. Kindly purchase a live production Bucket to view your contents again</h5>
    </div>
  )
}

export default page;
