'use client';
import React, { useEffect } from 'react';
import { MdClose } from "react-icons/md";
import styles from './modal.module.css';

const ParentModal = ({data, close}) => {

    const closeModal = e => {
        close();
    }

    useEffect(() => {
        const parentChildren = async () => {
            try{
                const res = await fetch(`/api/user/student/${data}`);
                const doc = await res.json();
            }catch(err){
                console.log(err);
            }
        }
        parentChildren();
    },[]);

  return (
    <div className={styles.modal}>
        <div className={styles.close_icon}>
            <MdClose  onClick={closeModal} className={styles.close} color='white' size={30} />
        </div>
        <div className={styles.formate}>
            <h4 className={styles.heading_5}><b>Student details..</b></h4>
            <div className={styles.parents}>
                <h5><b>Index Number : </b> {`1`}</h5>
                <h5><b>RegNo : </b> {`Sup/2067/UFD/88989`}</h5>
                <h5><b>Name : </b> {`Augustine Majesty`}</h5>
                <h5><b>Gender : </b> {`Male`}</h5>
                <h5><b>Age : </b> {`10 Years`}</h5>
                <h5><b>Parent Contact : </b> {`0803387368`}</h5>
                <h5><b>Address : </b> {`Amakaohia`}</h5>
                <h5><b>Section : </b> {`Primary`}</h5>
                <h5><b>Class Admitted : </b> {`Basic 5`}</h5>
                <h5><b>RegNo : </b> {`Augustine Majesty`}</h5>
            </div>
        </div>
    </div>
  )
}

export default ParentModal
