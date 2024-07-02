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
  const [students, setStudents] = useState([]);

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
    if(res.status === 200) {
      const student = await res.json();
      const spread = [{...student}]
      setStudents(spread);
    }else{
      console.log('faild to register student..')
    }
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
                      {/* <div className={styles.auto_Search}>
                        <select class="form-select" aria-label="Default select example">
                        <option selected>Select student's class</option>
                        <option value="activity1">Activity 1</option>
                        <option value="activity2">Activity 2</option>
                        <option value="nursery1">Nursery 1</option>
                        <option value="nursery2">Nursery 2</option>
                        <option value="nursery3">Nursery 3</option>
                        <option value="basic1">Basic 1</option>
                        <option value="basic2">Basic 2</option>
                        <option value="basic3">Basic 3</option>
                        <option value="basic4">Basic 4</option>
                        <option value="basic5">Basic 5</option>
                        <option value="jss1">JSS 1</option>
                        <option value="jss2">JSS 2</option>
                        <option value="jss3">JSS 3</option>
                        <option value="ss1">SS 1</option>
                        <option value="ss2">SS 2</option>
                        <option value="ss3">SS 3</option>
                        </select>
                      </div> */}
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
