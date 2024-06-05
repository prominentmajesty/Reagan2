'use client';
import React, {useState} from 'react';
import { MdClose } from "react-icons/md";
import styles from './deleteUpdateModal.module.css';

const DeleteUpdateModal = ({id, closeDeleteModal, launchpersistState}) => {

  const [error, setError] = useState(false);

  const close = () => {
    closeDeleteModal()
  }

  const removePost = async() => {
    
    try {

      const res = await fetch(`/api/user/updates/editanddelete/${id}`,{
        method : 'DELETE',
      });

      if(res.status === 200) {
          launchpersistState();
          close();
      }else{
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }

    }catch(err){
      console.log(err);
    }

  }

  return (
    <div className={styles.container}>
        <div className={styles.close_icon}>
            <MdClose onClick={close} className={styles.close} color='white' size={30} />
        </div>
        <div className={styles.text_container}>
            <h5>Are you sure you want to delete this update ?? <br /><br/> Be aware that this action cannot be revoked once performed !!</h5>
            <div className = {styles.btn_container}>
                <button type="button" onClick={close} className="btn btn-secondary">Cancel</button>
                <button type="button" onClick={removePost} className="btn btn-danger">Delete</button>
            </div>
            {error ? 
              <div className={`alert alert-danger ${styles.error}`} role="alert">
                Failed !! could not perform delete operation
              </div>
              : ''
            }
        </div>
    </div>
  )
}

export default DeleteUpdateModal;
