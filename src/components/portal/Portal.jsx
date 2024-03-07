'use client';
import React, {useEffect, useState} from 'react';
import styles from './portal.module.css';
import Sidebar from './sidebar/Sidebar';
import MobileSidebar from './mobileSidebar/MobileSidebar';
import HandBurger from './handburger/Handburger';
import Unqualified from './unqualified/Unqualified';
import SuspenseWork from './suspense/Suspense';
import { useRouter } from "next/navigation";
import StudentForm from './studentForm/StudentForm';
import StudentDetails from './studentDetails/StudentDetails';

const Portal = ({session}) => {

  const [open, setOpen] = useState(false);
  const [state, setState] = useState(null);
  const [students, setStudents] = useState(null);
  var arr;

  const [input, setInput] = useState({
    search : ''
  });

  const {search} = input;

  const handleChange = e => {
    setInput({...input, [e.target.name] : e.target.value});
  }
  
  const submit = async (e) => {
    e.preventDefault();
   try{

    const res = await fetch('/api/user/student', {
      method : 'POST',
      body: JSON.stringify({
        data : input
      }),
    });
    const student = await res.json();
    const spread = [{...student}]
    setStudents(spread);
   }catch(err){
    console.log(err);
   }
  }

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

  const close = () => {
    setOpen(false);
  }

  const update = async () => {
    try{
      const response = await fetch('/api/user/students');
      const data = await response.json();
      setStudents(data);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    try{
      const fetchstudents = async () => {
        const response = await fetch('/api/user/students');
        const data = await response.json();
        setStudents(data);
      }
      fetchstudents();
    }catch(err){
      console.log(err);
    }
  },[]);

  const handleClicked = () => {
    setOpen(true);
  }

    return (
      state ?
        <>
          {
            state[0].isTeacher ? 
              <>
                <div className={styles.portal}>
                  <Sidebar/>
                  <div className={styles.right}>
                    <HandBurger open={open} handleClicked={handleClicked}/>
                    <div className={styles.right_color}>
                      <div className={`input-group mb-3 ${styles.search}`}>
                        <input 
                          name='search' 
                          value={search}  
                          onChange={handleChange}
                          type="text" 
                          className={
                            `form-control ${styles.search_field}`
                          } 
                          placeholder="Enter student registration number" 
                          aria-label="Recipient's username" 
                          aria-describedby="button-addon2" 
                          required
                        />
                        <button onClick={(e) => {submit(e)}} className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
                      </div>
                      <StudentDetails students={students}/>
                      <StudentForm update={update} />
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

export default Portal
