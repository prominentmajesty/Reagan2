'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useFormState } from "react-dom";
import styles from './studentForm.module.css';
import { studentDetails } from '@/lib/action';

const StudentForm = ({ update }) => {

    const ref = useRef(null);
    const [state, formAction] = useFormState(studentDetails, undefined);
    
    const [message, setMessage] = useState(false);

    useEffect(() => {
      if(message === true){
        setTimeout(() => {
          setMessage(false);
        }, 3000);
      }
    }, [message])

    useEffect(() => { 
      if(state){
        if(state.success){
          setMessage(true);
          ref.current.reset();
          update();
        }
      }
    }, [state])
   
    return (
      <form ref={ref} className={styles.form} action={formAction}>
    
        <legend>Enter student's Records</legend>

        {
          message? <div className={styles.flash}>Data Upload was successful..</div> : ''
        }

        <div className="for-firstName">
          <label htmlFor='firstName'>First Name</label>
          <input id="firstName" type="text" className={styles.input} placeholder="first name" name="firstname" />
        </div>

        <div className="for-otherNames">
          <label htmlFor='otherNames'>Other Names</label>
          <input id="otherNames" type="text" className={styles.input} placeholder="other names" name="othernames" />
        </div>

        <div className="form-age">
          <label htmlFor='age'>Age</label>
          <input id="age" type="text" className={styles.input} placeholder="age" name="age" />
        </div>

        <div className="for-gender">
          <label htmlFor='gender'>Gender</label>
          <input id="gender" type="text" className={styles.input} placeholder="Gender" name="gender" />
        </div>

        <div className="for-classAdmited">
          <label htmlFor='classAdmited'>CLass Admitted</label>
          <input id="classAdmited" type="text" className={styles.input} placeholder="CLass Admitted" name="classAdmited" />
        </div>
        
        <div className="for-section">
          <label htmlFor='section'>Section</label>
          <select className={`form-select ${styles.input}`} id="section" placeholder="section" name="section" aria-label="Default select example">
            <option selected></option>
            <option value="Primary">Primary section</option>
            <option value="Secondary">Secondary section</option>
          </select>
        </div>

        <div className="for-parentphone">
          <label htmlFor='parentphone'>Parent Phone Number</label>
          <input id="parentphone" type="text" className={styles.input} placeholder="parent phone" name="parentphone" />
        </div>
        
        <button className={styles.formBTN}>Upload information</button>
        
        <div className={styles.studentFormError}>{state?.error}</div>
      </form>
  )
}

export default StudentForm;
