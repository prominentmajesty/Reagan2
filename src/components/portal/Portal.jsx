'use client';
import React, {useState} from 'react';
import styles from './portal.module.css';
import Sidebar from './sidebar/Sidebar';
import MobileSidebar from './mobileSidebar/MobileSidebar';
import { CgMenuLeft } from "react-icons/cg";

const Portal = () => {

  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
  }

  const handleClicked = () => {
    setOpen(true);
  }

  return (
    <>
      <div className={styles.portal}>
        <Sidebar/>
        <div className={styles.right}>
          <CgMenuLeft onClick={handleClicked } size={65} className={open ? styles.no_hanburger : styles.hanburger}/>
        </div>
      </div>
      {/* For mobile View */}
      <MobileSidebar open={open} close={close}/>
    </>
  )
}

export default Portal
