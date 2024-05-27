'use client';
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import styles from './updateAdmin.module.css';
import Unqualified from '../unqualified/Unqualified';
import SuspenseWork from '../suspense/Suspense';

const UpdateAdmin = ({session}) => {

    const [state, setState] = useState(null);
    const [update, setUpdates] = useState({
      category : '',
      subject : '',
      updates : '',
      date : ''
    });

    const {
      category, subject, updates, date
    } = update;

    const router = useRouter();

    useEffect(() => {
        const fetchDetails = async () => {
          const response = await fetch(`/api/user/${session?.user.email}/details`);
          const data = await response.json();
          setState(data);
        }
        if (session?.user.id) fetchDetails();
      },[session?.user.id]);

      useEffect(() => {
        !session ? router.push('/') : console.log('');
      }, []);

      const handleChange = e => {
        setUpdates({...update, [e.target.name] : e.target.value});
      }

      const handleSubmit = async e => {
        try {

          const result = await fetch('/api/user/updates/postupdates', {
            method : 'POST',
            'Content-Type' : 'application/json',
            body : JSON.stringify(
              {
                category,
                subject,
                updates,
                date
              }
            )

          });

          if(result.status === 200){
            console.log('Post went successful..')
          }

        }catch(err){
          console.log(err);
        }
      }

  return (
    state ? 
      <>
        { state[0].isAdmin ?
          <>
            <div className={styles.Updatemanagment}>
              <h4 className={styles.caption}>Post Updates For School, Parents and Students..</h4>
              <button className={styles.update_post} type="button">View and perform other operations on your posts...</button>
            </div>
            <div className={styles.select_items}>
              <label className={styles.label}>Select category to post to..</label>
              <select onChange={handleChange} className={`form-select form-select-lg ${styles.formate_field}`} aria-label=".form-select-lg example">
                <option value="management">Post to management</option>
                <option value="people">Post to students and Parents</option>
              </select>
              <label className={`styles.subject_label ${styles.label}`}>Add Subject..</label>
              <input onChange={handleChange} type="text" className={`orm-control ${styles.subject_input} ${styles.formate_field}`} id="validationDefault03"></input>
              <div className={`${styles.wrapper}`}>
                <div className={`${styles.textarea}`} >
                  <label className={`${styles.label} ${styles.formate}`}>Post updates..</label>
                  <textarea onChange={handleChange} className={`form-control ${styles.formate_field}`} id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className = {`${styles.date}`}>
                  <label className={`${styles.label} ${styles.formate}`}>Choose date..</label>
                  <input onChange={handleChange} className={`${styles.date_input} ${styles.formate_field}`} type="date" name="" id="" />
                </div>
              </div>
              <button onClick={handleSubmit} className={`btn btn-primary ${styles.updateBtn}`} type="button">Post Updates..</button>
            </div>
          </>
        : 
          <>
            <Unqualified />
          </>
        }
      </>
    : <SuspenseWork />
  )
}

export default UpdateAdmin;
