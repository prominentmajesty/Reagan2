import React from 'react';
import Image from 'next/image';
import { BsCloudUpload } from "react-icons/bs";
import { TbCloudDownload, TbLogout } from "react-icons/tb";
import { PiStudent } from "react-icons/pi";
import { RiParentLine } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { images } from '@/constants';
import styles from './sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.left}>
      <Image src={images.profile} className={styles.profile_img}/>
      <span className={styles.sidebar_contents}>
      <PiStudent size={30}/> <b>Students</b>
      </span> 
      <span className={styles.sidebar_contents}>
      <RiParentLine size={30}/> <b>Parents</b>
      </span> 
      <span className={styles.sidebar_contents}>
      <BsCloudUpload size={30}/> <b>Upload Results</b>
      </span> 
      <span className={styles.sidebar_contents}>
      <TbCloudDownload size={30}/> <b>View Results</b>
      </span> 
      <span className={styles.sidebar_contents}>
      <ImProfile size={30}/> <b>Profile</b>
      </span>
      <span className={styles.sidebar_contents}>
      <TbLogout size={30}/> <b>Logout</b>
      </span>
    </div>
  )
}

export default Sidebar
