'use client';
import React, {useEffect, useState} from 'react';
import { MdClose } from "react-icons/md";
import styles from './editPostModal.module.css'

const EditPostModal = ({singleUpdate, closeEdit}) => {

  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [state, setstate] = useState({
    subject : singleUpdate.subject,
    update : singleUpdate.updates
  });

  const {
    subject,
    update
  } = state

  // console.log(singleUpdate)

    const handleChange = e => {
      setstate({...state, [e.target.name] : e.target.value});
    }

    const edit = async() => {
      try{

        const res = await fetch(`/api/user/updates/editanddelete/${singleUpdate._id}`,{
          method : 'PATCH',
          'Content-Type' : 'application/json',
          body : JSON.stringify({
            subject,
            update
          })
        });

        if(res.status === 200){

          setSuccess(true);

         setTimeout(() => {
            setSuccess(false);
            closeEdit();
         }, 3000);


        }else{
          
          setFailed(true);

          setTimeout(() => {
            setFailed(false);
          }, 3000);

        }

      }catch(err){
        console.log(err);
      }
    }

  return (
    <div className={styles.container}>
      <div className={styles.close_icon}>
        <MdClose onClick={()=> {closeEdit()}} className={styles.close} color='white' size={30} />
      </div>
      <div className={styles.field_container}>
        {failed ? <div className="alert alert-danger" role="alert">Oops !! failed to edit update</div> : ''}
        {success ? <div className="alert alert-success" role="alert">Success !! Operation was successful</div> : ''}
        <div className="mb">
          <label for="exampleFormControlInput1" className="form-label">Edit subject</label>
          <input onChange={handleChange} type="text" name='subject' value={subject} className="form-control" id="exampleFormControlInput1" />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput2" className={`form-label ${styles.label}`}>Edit post</label>
          <textarea onChange={handleChange} value={update} name='update' className="form-control" id="exampleFormControlInput2" rows="3" />
        </div>
        <button onClick={edit} className={`btn btn-primary ${styles.btn_edit}`} type="button">Submit edited</button>
      </div>
    </div>
  )
}

export default EditPostModal;
