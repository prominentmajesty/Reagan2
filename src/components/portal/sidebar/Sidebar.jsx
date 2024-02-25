'use client';
import React from 'react';
import Image from 'next/image';
import { BsCloudUpload } from "react-icons/bs";
import { TbCloudDownload, TbLogout } from "react-icons/tb";
import { PiStudent } from "react-icons/pi";
import { RiParentLine } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { images } from '@/constants';
import { useRouter } from 'next/navigation'
import styles from './sidebar.module.css';
import { usePathname } from "next/navigation";

const Sidebar = () => {

  const MyRouter = useRouter();
  const pathName = usePathname();

  return (
    <div className={styles.left}>
      <Image src={images.profile} className={styles.profile_img}/>
      <span onClick={() => MyRouter.push('/portal')} className={`${styles.sidebar_contents} ${pathName === '/portal' && styles.active}`}>
        <PiStudent size={30}/> <b>Students</b>
      </span> 
      <span onClick={() => MyRouter.push('/parents')} className={`${styles.sidebar_contents} ${pathName === '/parents' && styles.active}`}>
        <RiParentLine size={30}/> <b>Parents</b>
      </span> 
      <span onClick={() => MyRouter.push('/resultupload')} className={`${styles.sidebar_contents} ${pathName === '/resultupload' && styles.active}`}>
        <BsCloudUpload size={30}/> <b>Upload Results</b>
      </span> 
      <span onClick={() => MyRouter.push('/viewresult')} className={`${styles.sidebar_contents} ${pathName === '/viewresult' && styles.active}`}>
        <TbCloudDownload size={30}/> <b>View Results</b>
      </span> 
      <span onClick={() => MyRouter.push('/profile')} className={`${styles.sidebar_contents} ${pathName === '/profile' && styles.active}`}>
        <ImProfile size={30}/> <b>Profile</b>
      </span>
      <span className={styles.sidebar_contents}>
      < TbLogout size={30}/> <b>Logout</b>
      </span>
    </div>
  )
}

export default Sidebar
