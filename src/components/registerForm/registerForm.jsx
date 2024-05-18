'use client';
import React from 'react';
import styles from "./registerForm.module.css";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from '@/lib/action';

const RegisterForm = () => {

  const [state, formAction] = useFormState(register, undefined);
  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/login");
  }, [state?.success, router]);

  return (

    <form className={styles.form} action={formAction}>

      <div className="form-email">
        <label for='email'>Email</label>
        <input id="email" type="email" className={styles.input} placeholder="email" name="email" />
      </div>

      <div className="form-password">
        <label for='password'>Password</label>
        <input id="password" type="password" className={styles.input} placeholder="password" name="password" />
      </div>

      <div className="form-password">
        <label for='password-retype'>Confirm Password</label>
        <input id="password-retype" type="password" className={styles.input} placeholder="confirm password" name="passwordRepeat" />
      </div>

      <button className={styles.registerBTN} >Register</button>

      <div className={styles.registerError}>{state?.error}</div>
      
      <div className={styles.last}>
        <Link href="/login" className={styles.registerLink}>
          {"Already have an account ?"} <b>Login</b>
        </Link>
      </div>
      <Link href="/" className={styles.registerLink}>
        {"Back to Home"}
      </Link>
    </form>
  )
}

export default RegisterForm
