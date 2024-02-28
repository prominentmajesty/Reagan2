"use client";

import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import Link from "next/link";
import { login } from "@/lib/action";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <form className={styles.form} action={formAction}>

      <div className="form-email">
        <label htmlFor='email'>Email</label>
        <input id="email" type="text" className={styles.input} placeholder="Email" name="username" />
      </div>
      
      <div className="form-password">
        <label htmlFor='password'>Password</label>
        <input id="password" type="password" className={styles.input} placeholder="password" name="password" />
      </div>
      
      <button className={styles.loginBTN}>Login</button>
      
      <div className={styles.loginError}>{state?.error}</div>
      
      <div className={styles.last}>
        <Link href="/register" className={styles.loginLink}>
          {"Don't have an account?"} <b>Register</b>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;