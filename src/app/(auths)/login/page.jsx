import React from 'react';
import { FaGoogle } from "react-icons/fa6";
import styles from './login.module.css';

// liberary inports
import {images} from '@/constants';
import LoginForm from "@/components/loginForm/loginForm";
import { googleLogin } from '@/lib/action';

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={googleLogin}>
          <button className={styles.google}><FaGoogle className={styles.FaGoogle} />Login with Google</button>
        </form>
        <h5 className={styles.or}>OR with email & password</h5>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage;
