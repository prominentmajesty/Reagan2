'use client';
import React, {useEffect, useState} from 'react';
import styles from './resultUpload.module.css';
import Sidebar from '../sidebar/Sidebar';
import HandBurger from '../handburger/Handburger';
import MobileSidebar from '../mobileSidebar/MobileSidebar';
import Unqualified from '../unqualified/Unqualified';
import SuspenseWork from '../suspense/Suspense';
import { useRouter } from 'next/navigation';

const ResultUpload = ({ regNo, session }) => {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState(null);
    const router = useRouter();

    const arr = regNo.split('');
    arr.splice(3, 0, "/");
    arr.splice(8, 0, "/");
    const str = arr.join('');
    console.log(str);

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
                    <div className={styles.right_color}>
                      <span>jfdbfdfjopkm hdhjdfjkfjkdf fdhjdfjdfjkdf fdjkdfkjfdjkdf fjkdfjkdfjkdfjkdf fjkfdjkdfjkdfkjldf fdkjfdjkdfkjdfkjdf iorhirhorir kfhofdhiofniof</span>
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

export default ResultUpload;
