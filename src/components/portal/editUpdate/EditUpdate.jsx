'use client';
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Unqualified from '../unqualified/Unqualified';
import SuspenseWork from '../suspense/Suspense';
import styles from './editUpdate.module.css'

const EditUpdate = ({session}) => {

    const [state, setState] = useState(null);
    const [updates, setUpdates] = useState(null);

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

    useEffect(() => {
      const fetupdates = async e => {
        try {
          const res = await fetch('/api/user/updates/getupdates');
          const details = await res.json();
          setUpdates(details);
        }catch(err){
          console.log(err);
        }
      }
      fetupdates();
    },[]);

    console.log(updates)

  return (
    state ?
      <>
      {
          state[0].isAdmin ? 
          <>
            <div className={styles.parent}>
              <div className={styles.bread_crumb}>
                <div className={styles.home_crumb_parent}>
                  <span className={styles.home_crumb} onClick={() => {router.push('/admin')}}>Admin / </span> 
                  <span>Modify</span>
                </div>  
                <div className={styles.selects}>
                  <labe className={styles.label}>Select category to show</labe>
                  <select name='category' className={`form-select form-select-lg ${styles.formate_field}`} aria-label=".form-select-lg example">
                    <option value="Post for management">Post to management</option>
                    <option value="Post for parents and students">Post to students and Parents</option>
                  </select>
                </div>
              </div>
              <div className={styles.child}>
                {updates && updates.map((update, key) => (
                  <div key={key} className={`card ${styles.custom_card}`}>
                    <div className={`card-header ${styles.custom_card_header}`}>
                      <h5><b>{update.category}</b></h5>
                    </div>
                    <div className={`card-body ${styles.custom_card_body}`}>
                      <h5 className={`card-title ${styles.custom_card_title}`}>{update.subject}</h5>
                      <p className={`card-text ${styles.custom_card_text}`}>{update.updates}</p>
                      <div className={styles.btn_container}>
                        <a href="#" className={`btn btn-primary ${styles.custom_btn}`}>Edit post</a>
                        <a href="#" className={`btn btn-danger ${styles.custom_btn}`}>Delete post</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
          : 
          <>
            <Unqualified/>
          </>
      }
      </>
  : <SuspenseWork />
  )
}

export default EditUpdate;
