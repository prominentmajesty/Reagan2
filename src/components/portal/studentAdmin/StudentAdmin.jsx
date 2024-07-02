'use client';
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import styles from './studentAdmin.module.css';
import Unqualified from '../unqualified/Unqualified';
import SuspenseWork from '../suspense/Suspense';
import UpdateAdminStudent from './update/UpdateAdminStudent';
import DeleteStudent from './delete/DeleteStudent';

const StudentAdmin = ({session}) => {

  const [state, setState] = useState(null);
  const [paticipant, setPaticipant] = useState('Students')
  const [students, setStudents] = useState(null);
  const [closeModal, setCloseModal] = useState(false);
  const [detail, setDetail] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [validate, setValidate] = useState(false);
  const [deleteID, setDeleteID] = useState(null);

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

  const fetchStudents = async() => {
    try{
      const res = await fetch('/api/user/students');
      const result = await res.json();
      setStudents(result);
    }catch(err){
      console.log(err);
    }
    
  }

  fetchStudents();

}, []);

useEffect(() => {

  if(!closeModal){

    const fetchStudents = async() => {
      try{
        const res = await fetch('/api/user/students');
        const result = await res.json();
        setStudents(result);
      }catch(err){
        console.log(err);
      }
      
    }
  
    fetchStudents();
  }

}, [closeModal]);

useEffect(() => {
  !session ? router.push('/') : console.log('');
}, []);

useEffect(() => {
  if(validate){
    
    const fetchStudents = async() => {
      try{
        const res = await fetch('/api/user/students');
        const result = await res.json();
        setStudents(result);

        setTimeout(() =>{
          setValidate(false);
        }, 3000);

      }catch(err){
        console.log(err);
      }
      
    }
  
    fetchStudents();
  }
},[validate])

const close = () => {
  setCloseModal(false)
}

const update = (data) => {
  setDetail(data)
  setCloseModal(true);
}

const execOpenDelete = (_id) => {
  setDeleteID(_id);
  setOpenDelete(true)
}

const closeDelete = () => {
  setOpenDelete(false)
}

const execValidate = () => {
  setValidate(true)
}

  return (
    state ? 
      <>
        {state[0].isAdmin ? 
          <>
            {
              openDelete ? <DeleteStudent deleteID={deleteID} closeDelete={closeDelete} execValidate={execValidate} /> : ''  
            }
            {
              closeModal ? <UpdateAdminStudent detail={detail} close={close} /> : ''
            }
            <div className={styles.container}>
              <div className={styles.home_crumb_parent}>
                <span className={styles.home_crumb} onClick={() => {router.push('/admin')}}>Admin / </span> 
                <span className={styles.bread}>{paticipant}</span>
              </div>
              <div className={styles.caption}>
                <h5 className={styles.heading_5}>Student's Details..</h5>
              </div>
              <div className={styles.table_container}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col"><b>Index</b></th>
                      <th scope="col"><b>First name</b></th>
                      <th scope="col"><b>Other names</b></th>
                      <th scope="col"><b>Age</b></th>
                      <th scope="col"><b>Gander</b></th>
                      <th scope="col"><b>Class Admitted</b></th>
                      <th scope="col"><b>Section</b></th>
                      <th scope="col"><b>Parent phone</b></th>
                      <th scope="col"><b>Action</b></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      students && students.map((student, index) => (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <th>{student.firstname}</th>
                          <th>{student.othernames}</th>
                          <th>{student.age}</th>
                          <th>{student.gender}</th>
                          <th>{student.classAdmited}</th>
                          <th>{student.section}</th>
                          <th>{student.parentphone}</th>
                          <th>
                            <div className={styles.action_btn}>
                              <button onClick={() => {update(student)}} type="button" className="btn btn-secondary">update</button>
                              <button onClick={()=>{execOpenDelete(student._id)}} type="button" className="btn btn-danger">delete</button>
                            </div>
                          </th>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </>
          :
          <>
            <Unqualified />
          </>
        }
      </>
    : <SuspenseWork/>
  )
}

export default StudentAdmin;
