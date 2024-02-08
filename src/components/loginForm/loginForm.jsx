"use client";

import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import Link from "next/link";

const LoginForm = () => {
  const [state, formAction] = useFormState('', undefined);

  return (
    <form className={styles.form} action=''>

      <div className="form-email">
        <label for='email'>Email</label>
        <input id="email" type="text" className={styles.input} placeholder="username" name="username" />
      </div>
      
      <div className="form-password">
        <label for='password'>Password</label>
        <input id="password" type="password" className={styles.input} placeholder="password" name="password" />
      </div>
      
      <button className={styles.loginBTN}>Login</button>
      
      <div className={styles.last}>
        <Link href="/register" className={styles.loginLink}>
          {"Don't have an account?"} <b>Register</b>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;