'use client';
import React, {useState, useEffect} from 'react';
import Sidebar from '../sidebar/Sidebar';
import HandBurger from '../handburger/Handburger';
import MobileSidebar from '../mobileSidebar/MobileSidebar';
import SuspenseWork from '../suspense/Suspense';
import Unqualified from '../unqualified/Unqualified';
import { useRouter } from "next/navigation";
import styles from './updates.module.css';

const Updates = ({session}) => {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState(null)
    const [updates, setUpdates] = useState();
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
          const res = await fetch('/api/user/updates/getupdatesportal',{
            method : 'DELETE'
          });
          const details = await res.json();
          details.sort((a, b) => new Date(b.date) - new Date(a.date))
          setUpdates(details);
          console.log(details)
        }catch(err){
          console.log(err);
        }
      }
      fetupdates();
    },[]);
    
    const close = () => {
      setOpen(false);
    }
  
    const handleClicked = () => {
      setOpen(true);
    }
  
  return (
    state ?
      <>
        {
          state[0].isTeacher ? 
            <>
              <div className={styles.updates}>
                <Sidebar/>
                <div className={styles.right}>
                  <HandBurger open={open} handleClicked={handleClicked}/>
                  <div className={styles.right_color}>
                    <div className={styles.holder}>
                      {updates && updates.map((update, key) => (
                        <div key={key} className={`card ${styles.custom_card}`}>
                          <div className={`card-header ${styles.custom_card_header}`}>
                            <h5><b>{update.category}</b></h5>
                            <h6>{update.date}</h6>
                          </div>
                          <div className={`card-body ${styles.custom_card_body}`}>
                            <h5 className={`card-title ${styles.custom_card_title}`}>{update.subject}</h5>
                            <p className={`card-text ${styles.custom_card_text}`}>{update.updates}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* For mobile View */}
              <MobileSidebar open={open} close={close}/>
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
export default Updates;;
