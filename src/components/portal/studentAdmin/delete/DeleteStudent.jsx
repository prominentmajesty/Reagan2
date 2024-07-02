'use client';
import React from 'react';
import { MdClose } from "react-icons/md";
import styles from './delete.module.css';

const DeleteStudent = ({deleteID, closeDelete, execValidate}) => {
    const close = () => {
        closeDelete();
    }

    const remove = async() => {
        try{
            const res = await fetch(`/api/user/editStudent/${deleteID}`,
                {
                    method : 'DELETE'
                }
            );
            
            if(res.ok){
                execValidate();
                closeDelete();
            }

        }catch(err){
            console.log(err);
        }
    }

    return (
    <div className={styles.delete}>
        <div className={styles.close}>
            <MdClose onClick={close} className={styles.close_btn} color='white' size={30} />
        </div>
        <div className={styles.content}>
            <div className={styles.text_holder}>
                <h5 className={styles.text}>Are you sure you want to remove this student from the database ? Be aware that this action cannot be reversed once performed <br></br> </h5>
            </div>
            <div className={styles.btns}>
                <button onClick={close} type="button" className="btn btn-secondary">Cancel</button>
                <button onClick={remove} type="button" className="btn btn-danger">Delete</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteStudent;
