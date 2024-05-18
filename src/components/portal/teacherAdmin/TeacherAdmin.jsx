'use client';
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import styles from './teacherAdmin.module.css';
import Unqualified from '../unqualified/Unqualified';
import SuspenseWork from '../suspense/Suspense';

function TeacherAdmin({session}) {

  const [state, setState] = useState(null);
  const [data, setData] = useState(null);
  const [teacherStatus, setTeacherStatus]= useState(true);
  const [adminStatus, setAdminstatus] = useState(true);
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
    
      const users = async () => {
        const res = await fetch('/api/user/users');
        const data_ = await res.json();
        setData(data_);
      }
      users();
    
  },[]);

  console.log(data)

  const teacher = async (e, email) => {
    setTeacherStatus((prev) => !prev );
   try{
    const res = await fetch(`/api/user/${email}/details`,{
      method : 'PATCH',
      'Content-Type' : 'application/json',
      body : JSON.stringify({
        isTeacher : teacherStatus,
      })
    });

    if(res.status === 200) {
      const res = await fetch('/api/user/users');
      const data_ = await res.json();
      setData(data_)
    }else{
      setTeacherStatus((prev) => !prev );
    }

   }catch(err) {
    console.log(err);
   }
  }

  const admin = async (e, email) => {
    setAdminstatus((prev) => !prev );
   try{
    const res = await fetch(`/api/user/${email}/details`,{
      method : 'PUT',
      'Content-Type' : 'application/json',
      body : JSON.stringify({
        isAdmin : adminStatus,
      })
    });

    if(res.status === 200) {
      const res = await fetch('/api/user/users');
      const data_ = await res.json();
      setData(data_)
    }else{
      setAdminstatus((prev) => !prev );
    }

   }catch(err) {
    console.log(err);
   }
  }

  const erase = async (e,email) => {
    
    try{

       const res = await fetch(`/api/user/${email}/details`,{
        method : 'DELETE',
        'Content-Type' : 'application/json',
        body: JSON.stringify({
          email
        })
        
      });
      
      if(res.status === 200) {
        const res = await fetch('/api/user/users');
        const data_ = await res.json();
        setData(data_)
      }

    }catch(err){
      console.log(err);
    }
  }

  return (
    state ? 
    <>
      {state[0].isAdmin ? 
        <>
          <div className={styles.parent}>
            <div className={styles.table_container}></div>
              <table className={`table caption-top ${styles.table_}`}>
                <thead>
                  <tr>
                    <th scope="col">S/N</th>
                    <th scope="col">Email</th>
                    <th scope="col">Teacher Status</th>
                    <th scope="col">Admin Status</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Other Names</th>
                    <th scope="col">Contact</th>
                    <th scope="col">LGA</th>
                    <th scope="col">State</th>
                    <th scope="col">Nationality</th>
                    <th scope="col">Address</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.map((user, index) => (
                      <>
                        <tr>
                          <th scope="row">{index += 1}</th>
                          <th>{user.email}</th>
                          <th>
                            <div className={`form-check form-switch teacher-status ${styles.radio}`}>
                              <input checked={user.isTeacher}  className={`form-check-input ${styles.radio_btn}`} type="checkbox" id="flexSwitchCheckDefault" />
                            </div>
                          </th>
                          <th>
                            <div className={`form-check admin-status ${styles.check}`}>
                              <input checked={user.isAdmin} className={`form-check-input ${styles.ckeck_btn}`} type="checkbox" value="" id='flexCheckDefault'/>
                            </div>
                          </th>
                          <th>{user.firstName}kjsdkjdskldskldsklkl</th>
                          <th>{user.otherName}kskdkdskldkdkldssdd</th>
                          <th>{user.contact}jkdsjsdkjsdkjdskjdskj</th>
                          <th>{user.LGA} dsjkdskjdskjdsdssd</th>
                          <th>{user.state} ekjewjkewkjewkjwek</th>
                          <th>{user.Nationality} jsdfjhsdjdsjkdsjkdjk</th>
                          <th>{user.Address} jsdjdjdskjdsjkdkjdskjdskjdskjd</th>
                          <th>
                            <div className={`form-check form-switch ${styles.status}`}>
                              <input onClick={(e) => {teacher(e, user.email)}} className={`btn btn-primary ${styles.btn_action}`} type="reset" value={user.isTeacher ? "Remove teacher" : "Add teacher"}/>
                              <input onClick={(e) => {admin(e, user.email)}} className={`btn btn-primary ${styles.btn_action}`} type="reset" value={user.isAdmin ? "Remove admin" : "Add admin"}/>
                              <input onClick={(e) => {erase(e, user.email)}} className={`btn btn-danger ${styles.btn_action}`} type="reset" value="delete"/>
                            </div>
                          </th>
                        </tr>
                      </>
                    ))
                  }
                </tbody>
              </table>
          </div>
        </>
        :
        <>
          <Unqualified />
        </>
      }
    </>
  : <SuspenseWork />
  )
}

export default TeacherAdmin;
