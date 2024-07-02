'use client';
import React, { useState, useRef } from 'react';
import { MdClose } from "react-icons/md";
import styles from './studentForm.module.css';

const StudentForm = ({ update }) => {
    
    const [message, setMessage] = useState(false);
    const [error, setError] = useState(false);
    const [state, setState] = useState(null);

    
    const firstname = useRef(null);
    const othernames = useRef(null);
    const age = useRef(null);
    const gender = useRef(null);
    const classAdmited = useRef(null);
    const section = useRef(null);
    const parentphone = useRef(null);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = {
        firstname: firstname.current.value,
        othernames: othernames.current.value,
        age: age.current.value,
        gender: gender.current.value,
        classAdmited : classAdmited.current.value, 
        section : section.current.value,
        parentphone : parentphone.current.value,
      };

      try {

        const response = await fetch('/api/user/register', {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({
            firstname : formData.firstname,
            othernames : formData.othernames,
            age: formData.age,
            gender: formData.gender,
            classAdmited : formData.classAdmited, 
            section : formData.section,
            parentphone : formData.parentphone,
          })

        });

        if(response.status === 200) {
          setError(false);
          setMessage(true);
          firstname.current.value = '';
          othernames.current.value = '';
          age.current.value = '';
          gender.current.value = '';
          classAdmited.current.value = ''; 
          section.current.value = '';
          parentphone.current.value = '';
        }

        const res = await response.json();
        setState(res);

        update();
        
      } catch (error) {
        console.log(error)
        setError(true);
      }
    };

    const close = () => {
      setState(null)
      setMessage(false)
    }
   
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
    
        <legend>Enter student's Records</legend>

        {
          message? <div className={styles.flash}>
            <MdClose onClick={()=> {close()}} className={styles.close} color='white' size={25} />
            <h6>Data Upload was successful !!</h6>
            <h6>RegNo : {state?.regNo}</h6>
          </div> : ''
        }

        <div className="for-firstname">
          <label htmlFor='firstname'>First name</label>
          <input ref={firstname} id="firstname" type="text" className={styles.input} placeholder="first name" required/>
        </div>

        <div className="for-othernames">
          <label htmlFor='othernames'>Other names</label>
          <input ref={othernames} id="othernames" type="text" className={styles.input} placeholder="other name" required/>
        </div>

        <div className="form-age">
          <label htmlFor='age'>Age</label>
          <input ref={age} id="age" type="text" className={styles.input} placeholder="age" required/>
        </div>

        <div className="for-gender">
          <label htmlFor='gender'>Gender</label>
          <input ref={gender} id="gender" type="text" className={styles.input} placeholder="Gender" required />
        </div>

        <div className="for-classAdmited">
          <label htmlFor='classAdmited'>CLass Admitted</label>
          <select ref={classAdmited} id = 'classAdmited' className={`form-select ${styles.input}`} required>
            <option selected>Select student's class</option>
            <option value="activity1">Activity 1</option>
            <option value="activity2">Activity 2</option>
            <option value="nursery1">Nursery 1</option>
            <option value="nursery2">Nursery 2</option>
            <option value="nursery3">Nursery 3</option>
            <option value="basic1">Basic 1</option>
            <option value="basic2">Basic 2</option>
            <option value="basic3">Basic 3</option>
            <option value="basic4">Basic 4</option>
            <option value="basic5">Basic 5</option>
            <option value="jss1">JSS 1</option>
            <option value="jss2">JSS 2</option>
            <option value="jss3">JSS 3</option>
            <option value="ss1">SS 1</option>
            <option value="ss2">SS 2</option>
            <option value="ss3">SS 3</option>
          </select>
        </div>
        
        <div className="for-section">
          <label htmlFor='section'>Section</label>
          <select ref={section} className={`form-select ${styles.input}`} id="section" placeholder="section" required>
            <option selected></option>
            <option value="Primary">Primary section</option>
            <option value="Secondary">Secondary section</option>
          </select>
        </div>

        <div className="for-parentphone">
          <label htmlFor='parentphone'>Parent Phone Number</label>
          <input ref={parentphone} id="parentphone" type="text" className={styles.input} placeholder="parent phone" required/>
        </div>
        
        <button type='submit' className={styles.formBTN}>Upload information</button>
        
        {error ? <div className={styles.studentFormError}>Could not register student because something went wrong !!</div> : ''}
      </form>
  )
}

export default StudentForm;
