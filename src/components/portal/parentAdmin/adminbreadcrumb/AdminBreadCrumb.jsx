import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './adminbreadcrumb.module.css';

const AdminBreadCrumb = ({paticipant}) => {

  const router = useRouter();

  return (
    <div className={styles.home_crumb_parent}>
      <span className={styles.home_crumb} onClick={() => {router.push('/admin')}}>Admin / </span> 
      <span className={styles.bread}>{paticipant}</span>
    </div> 
  )
}

export default AdminBreadCrumb;
