'use client';
import React from 'react';
import { TbLogout } from "react-icons/tb";
import styles from './logout.module.css';
import { handleLogout } from '@/lib/action';
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  const signOutUser = () => {
    handleLogout();
    router.push('/');
  }
  
  return (
    <span className={styles.sidebar_contents}>
        <form action={signOutUser}>
            <button className={styles.logout_btn}>< TbLogout size={30}/> <b>Logout</b></button>
        </form>
    </span>
  )
}

export default Logout;
