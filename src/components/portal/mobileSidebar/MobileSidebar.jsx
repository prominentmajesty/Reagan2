'use client';
import React, {useState} from 'react';
import Image from 'next/image';
import { BsCloudUpload } from "react-icons/bs";
import { TbCloudDownload } from "react-icons/tb";
import { PiStudent } from "react-icons/pi";
import { RiParentLine } from "react-icons/ri";
import { GiEgyptianProfile } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { IoHomeOutline } from "react-icons/io5";
import { images } from '@/constants';
import { MdClose } from "react-icons/md";
import { useRouter } from 'next/navigation'
import styles from './mobileSidebar.module.css'
import { usePathname } from "next/navigation";
import Logout from '../sidebar/logout/Logout';

const MobileSidebar = ({open, close}) => {

  const MyRouter = useRouter();

  const pathName = usePathname();
  
  const exec = () => {
    close();
  }

  return (
    <div className={open ? styles.appear : styles.disappear}>
      <span className={styles.x}><MdClose onClick={() => exec()} size={40} className={styles.x_icon}/></span>
      <div className={styles.center}>
        <Image src={images.profile} className={styles.profile_img}/>
        <span onClick={() => MyRouter.push('/portal')} className={`${styles.sidebar_contents} ${pathName === '/portal' && styles.active}`}>
          <PiStudent size={30}/> <b>Upload Students</b>
        </span> 
        <span onClick={() => MyRouter.push('/parents')} className={`${styles.sidebar_contents} ${pathName === '/parents' && styles.active}`}>
          <RiParentLine size={30}/> <b>View Parents</b>
        </span> 
        <span onClick={() => MyRouter.push('/updates')} className={`${styles.sidebar_contents} ${pathName === '/updates' && styles.active}`}>
          <BsCloudUpload size={30}/> <b>View Updates</b>
        </span> 
        <span onClick={() => MyRouter.push('/viewresult')} className={`${styles.sidebar_contents} ${pathName === '/viewresult' && styles.active}`}>
          <TbCloudDownload size={30}/> <b>View Results</b>
        </span> 
        <span onClick={() => MyRouter.push('/profile')} className={`${styles.sidebar_contents} ${pathName === '/profile' && styles.active}`}>
          <GiEgyptianProfile size={30}/> <b>Update Profile</b>
        </span>
        <span onClick={() => MyRouter.push('/')} className={styles.sidebar_contents}>
          <IoHomeOutline size={30}/> <b> Back to Home</b>
        </span>
        <Logout />
      </div>
    </div>
  )
}

export default MobileSidebar;
//