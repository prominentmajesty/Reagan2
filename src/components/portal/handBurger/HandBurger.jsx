'use client';
import React from 'react';
import { CgMenuLeft } from "react-icons/cg";
import styles from './handburger.module.css'

const HandBurger = ({open, handleClicked}) => {

    const openSidebar = () => {
        handleClicked();
    }

  return (
    <CgMenuLeft onClick={openSidebar} size={65} className={open ? styles.no_hanburger : styles.hanburger}/>
  )
}

export default HandBurger;
