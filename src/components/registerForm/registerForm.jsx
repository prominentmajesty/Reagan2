import React from 'react';
import styles from "./registerForm.module.css";

const RegisterForm = () => {
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

      <button className={styles.registerBTN} type='submit'>Register</button>
    
    </form>
  )
}

export default RegisterForm
