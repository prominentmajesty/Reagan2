'use client';
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import styles from './parentAdmin.module.css';
import Unqualified from '../unqualified/Unqualified';
import SuspenseWork from '../suspense/Suspense';
import AdminBreadCrumb from './adminbreadcrumb/AdminBreadCrumb';
import RegisterParent from './components/registerParents/RegisterParent';
import ViewParents from './components/viewParents/ViewParents';

const ParentAdmin = ({session}) => {

    const router = useRouter();
    const [state, setState] = useState(null);
    const [paticipant, setPaticipant] = useState('Parents')
    const [showElement, setShowElement] = useState(true);

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

  return (
    state ? 
      <>
        {state[0].isAdmin ? 
          <>
            <div className={styles.container}>
              <div className={styles.breadcrumb}>
                <AdminBreadCrumb paticipant={paticipant}/>
              </div>
              <div className={`row ${styles.first}`}>
                <div className={'d-grid mb-3 gap-2 col-sm-12 col-md-4 col-lg-5 col-xl-5 mx-auto'}>
                  <button onClick={() => {setShowElement(true)}} className={`btn btn-primary ${styles.addheight}`} type="button">Register parent's details</button>
                </div>
                <div className={'d-grid mb-3 gap-2 col-sm-12 col-md-4 col-lg-5 col-xl-5 mx-auto'}>
                  <button onClick={()=>{setShowElement(false)}} className={`btn btn-primary ${styles.addheight}`} type="button">View parent's details</button>
                </div>
              </div>
              {showElement ? <RegisterParent /> : <ViewParents />}
            </div>
          </>
          :
          <>
            <Unqualified />
          </>
        }
      </>
    : <SuspenseWork/>
  );
};

export default ParentAdmin;
