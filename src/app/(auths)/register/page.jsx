import React from 'react';
import Image from 'next/image';
import RegisterForm from '@/components/registerForm/registerForm';
import { images } from '@/constants';
import styles from './register.module.css'

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.profileContainer}>
          <Image src={images.profile}  className={styles.profile}/>
        </div>
        <div className={styles.account}>Create an account</div>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage;
