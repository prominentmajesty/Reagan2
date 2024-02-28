'use client';
import React, {useEffect, useState} from 'react';
import styles from './resultUpload.module.css';
import Sidebar from '../sidebar/Sidebar';
import HandBurger from '../handburger/Handburger';
import MobileSidebar from '../mobileSidebar/MobileSidebar';
import Unqualified from '../unqualified/Unqualified';
import SuspenseWork from '../suspense/Suspense';
import { useRouter } from 'next/navigation';

const ResultUpload = ({session}) => {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState(null);
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
                <div className={styles.resultUpload}>
                  <Sidebar/>
                  <div className={styles.right}>
                    <HandBurger open={open} handleClicked={handleClicked}/>
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

export default ResultUpload;
