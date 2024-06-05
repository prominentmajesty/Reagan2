'use client';
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Unqualified from '../unqualified/Unqualified';
import SuspenseWork from '../suspense/Suspense';
import styles from './editUpdate.module.css'
import EditPostModal from '../editPostModal/EditPostModal';
import DeleteUpdateModal from '../deleteUpdateModal/DeleteUpdateModal';

const EditUpdate = ({session}) => {

    const [persistState, setPersistState] = useState(false);
    const [state, setState] = useState(null);
    const [updates, setUpdates] = useState(null);
    const [singleUpdate, setSingleUpdate] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [id, setId] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

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

    useEffect(() => {
      const fetchUpdates = async () => {
        if(persistState) {
          try {
  
            const res = await fetch('/api/user/updates/getupdates');
            
            if(res.status === 200){
              const docs = await res.json();
              setUpdates(docs);
            }
  
          }catch(err) {
            console.log(err);
          }
        }
      }
      fetchUpdates();
    }, [persistState]);

    const openEdit = (_id, subject, updates) => {
      const obj = {
        _id,
        subject,
        updates
      }
      // console.log(obj);
      setSingleUpdate(obj);
      setEditModal(true);
    }

    const closeEdit = e => {
      setEditModal(false);
    }

    const handleChange = async e => {
      const selectedValue = e.target.value;
      const res = await fetch('/api/user/updates/getupdates');
      const details = await res.json();
      const doc = details.filter((detail) => detail.category === selectedValue);
      console.log(doc)
      doc.sort((a, b) => new Date(b.date) - new Date(a.date))
      setUpdates(doc)
    }

    const closeDeleteModal = e => {
      setOpenDeleteModal(false);
    }  

    const deleteUpdate = _id => {
      setPersistState(false);
      setId(_id)
      setOpenDeleteModal(true);
    }

   const launchpersistState = () => {
    setPersistState(true)
   }

  return (
    state ?
      <>
      {
          state[0].isAdmin ? 
          <>
            {editModal ? <EditPostModal singleUpdate = {singleUpdate} closeEdit = {closeEdit}/> : ''}
            { openDeleteModal ? <DeleteUpdateModal id = {id} closeDeleteModal = {closeDeleteModal} launchpersistState = {launchpersistState} /> : ''}
            <div className={styles.parent}>
              <div className={styles.bread_crumb}>
                <div className={styles.home_crumb_parent}>
                  <span className={styles.home_crumb} onClick={() => {router.push('/admin')}}>Admin / </span> 
                  <span>Modify</span>
                </div>  
                <div className={styles.selects}>
                  <labe className={styles.label}>Select post category to view</labe>
                  <select onChange={handleChange} name='category' className={`form-select form-select-lg ${styles.formate_field}`} aria-label=".form-select-lg example">
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
                      <h6>{update.date}</h6>
                    </div>
                    <div className={`card-body ${styles.custom_card_body}`}>
                      <h5 className={`card-title ${styles.custom_card_title}`}>{update.subject}</h5>
                      <p className={`card-text ${styles.custom_card_text}`}>{update.updates}</p>
                      <div className={styles.btn_container}>
                        <a onClick={() => {openEdit(update._id, update.subject, update.updates )}} className={`btn btn-primary ${styles.custom_btn}`}>Edit post</a>
                        <a href="#" onClick={() => {deleteUpdate(update._id)}} className={`btn btn-danger ${styles.custom_btn}`}>Delete post</a>
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
