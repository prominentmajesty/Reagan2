'use client'
import React from 'react';
import Image from 'next/image';
import { images } from '@/constants'
import { IoCloudUploadOutline } from "react-icons/io5";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import styles from './studentDetails.module.css';

const StudentDetails = ({ students }) => {
  
  const router = useRouter();

  const exec = data => {
    var arr = data.split("");
    arr.splice(3, 1);
    arr.splice(7, 1);
    const str = arr.join('')
    router.push(`/resultupload/${str}`);
  }

  return (
    <>
      <div className={`table-responsive ${styles.table_container}`}>
        <span type="button" className={`${styles.continue_registration}`}><h4 className={styles.continue_text}>Supreme Reagan Registered students</h4></span>
        <table class={`table caption-top table-striped table-hover ${styles.table_custom}`}>
          <thead>
            <tr>
              <th>Index</th>
              <th className={styles.space}>Image</th>
              <th className={styles.space}>RegNo</th>
              <th className={styles.space}>FirstName</th>
              <th className={styles.space}>OtherNames</th>
              <th className={styles.space}>Age</th>
              <th className={styles.space}>Gender</th>
              <th className={styles.space}>Class Admited</th>
              <th className={styles.space}>Section</th>
              <th className={styles.space}>Parent Line</th>
              <th className={styles.space}>Parents/guardian</th>
              <th className={styles.space}>Upload Results</th>
              <th className={styles.space}>View Results</th>            
            </tr>
          </thead>
          <tbody>
            {students && students.map((student, index) => (
         
              <tr key={index}>
                <th>{index + 1}</th>
                <th className={styles.space}>{student.image? <Image src={student.image} className={styles.profile} alt='avater'/> : <Image src={images.profile} className={styles.profile} alt='avater'/>}</th>
                <th className={styles.space}>{student.regNo}</th>
                <th className={styles.space}>{student.firstname}</th>
                <th className={styles.space}>{student.othernames}</th>
                <th className={styles.space}>{student.age}</th>
                <th className={styles.space}>{student.gender}</th>
                <th className={styles.space}>{student.classAdmited}</th>
                <th className={styles.space}>{student.section}</th>
                <th className={styles.space}>{student.parentphone}</th>
                <th className={styles.space}>{student.parent? <button>Parents</button> : 'No parent yet'}</th>
                <th className={`${styles.space} ${styles.click}`}><IoCloudUploadOutline onClick={() => {exec(student.regNo)}} size={25}/></th>
                <th className={`${styles.space} ${styles.click}`}><HiOutlineViewfinderCircle size={25}/></th>
              </tr>
              
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default StudentDetails
