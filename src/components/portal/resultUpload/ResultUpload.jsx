'use client';
import React, {useState} from 'react';
import styles from './resultUpload.module.css';
import Sidebar from '../sidebar/Sidebar';
import HandBurger from '../handburger/Handburger';
import MobileSidebar from '../mobileSidebar/MobileSidebar';

const ResultUpload = () => {
    const [open, setOpen] = useState(false);

    const close = () => {
      setOpen(false);
    }
  
    const handleClicked = () => {
      setOpen(true);
    }
  
    return (
      <>
        <div className={styles.resultUpload}>
          <Sidebar/>
          <div className={styles.right}>
            <HandBurger open={open} handleClicked={handleClicked}/>
          </div>
        </div>
        {/* For mobile View */}
        <MobileSidebar open={open} close={close}/>
      </>
    )
}

export default ResultUpload;
