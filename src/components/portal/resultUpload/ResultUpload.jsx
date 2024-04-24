'use client';
import React, { useEffect, useState, useRef } from 'react';
import styles from './resultUpload.module.css';
import Sidebar from '../sidebar/Sidebar';
import HandBurger from '../handburger/Handburger';
import MobileSidebar from '../mobileSidebar/MobileSidebar';
import Unqualified from '../unqualified/Unqualified';
import SuspenseWork from '../suspense/Suspense';
import { useRouter } from 'next/navigation';

export const ResultUpload = ({ reg, session }) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(null);
  const [phaze, setPhaze] = useState(false);
  const [student, setStudent] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const ref = useRef(null);

  const [data, setData] = useState({
    firstname : '',
    othernames : '',
    regNo : '',
    section : '',
    elementry : '', 
    assesment : '', 
    term : '',
    date : ''
  });

  const {
    firstname,
    othernames,
    regNo,
    section,
    elementry,
    assesment,
    term,
    date
  } = data

  const handleChanged = e => {
    if(e.target.value === 'secondary'){
      setPhaze(true);
      setData({...data, [e.target.name] : e.target.value})
    }else if(e.target.value === 'primary'){
      setPhaze(false);
      setData({...data, [e.target.name] : e.target.value})
    }else{
      setData({...data, [e.target.name] : e.target.value})
    }
    
  };

  useEffect(() => {
    try{
      const fetchstudent = async() => {
        const response = await fetch(`/api/user/result/${reg}`);
        const student = await response.json();
        setStudent(student);
      }
      fetchstudent();
    }catch(err){
      console.log(err);
    }
  },[]); 

  const router = useRouter();

  const [inputList, setInputList] = useState([
    {
      Label: '',
      Value: ''
    },
  ]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const addInput = () => {
    setInputList([...inputList, { Label: '', Value: '' }]);
  };

  const removeInput = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(`/api/user/${session?.user.email}/details`);
      const data = await response.json();
      setState(data);
    };

    if (session?.user.id) fetchDetails();
  }, [session?.user.id]);

  useEffect(() => {
    !session ? router.push('/') : console.log('');
  }, []);

  const close = () => {
    setOpen(false);
  };

  const handleClicked = () => {
    setOpen(true);
  };

  const handleSubmit = async e => { 
    
   try{

      var obj = {};

      if(student){
        const firstname = student?.firstname;
        const othernames = student?.othernames;
        const regNo = student?.regNo;

        obj.details = {...data, firstname, othernames, regNo}

        obj.scores = inputList
        console.log(obj);
        
        const res = await fetch("/api/user/uploadresult",{
          method : "POSt",
          body : JSON.stringify({
            obj
          })
        });
        console.log(res.status === 200)
        if(res.ok){
          setUploaded(true)
          setStudent(null);
          ref.current.value = null;
          setTimeout(() => {
            setUploaded(false);
          }, 3000);

        }else{
          setFailed(true);
          setTimeout(() => {
            setFailed(false);
          }, 3000);
        }

      }else {
        obj.details = data;
        obj.scores = inputList;
        const res = await fetch("/api/user/uploadresult",{
          method : "POSt",
          body : JSON.stringify({
            obj
          })
        });
        if(res.status === 200){
          setStudent(null);
          setUploaded(true)
          ref.current.value = null;
          setTimeout(() => {
            setUploaded(false);
          }, 3000);
        }else{
          setFailed(true);
          setTimeout(() => {
            setFailed(false);
          }, 3000);
        }
      }

    }catch(err){
      console.log(err);
    }
  }

  return (
    state ?
      <>
        {state[0].isTeacher ?
          <>
            <div className={styles.resultUpload}>
              <Sidebar />
              <div className={styles.right}>
                <HandBurger open={open} handleClicked={handleClicked} />
                <div className={styles.right_color}>
                  <span className={styles.caption}>Student's Result Upload</span>
                  <form className={`row g-4 needs-validation ${styles.form}`} novalidate>
                    <div className="col-md-4">
                      <label for="validationCustom01" className="form-label">First name</label>
                      <input type="text" ref={ref} name='firstname' onChange={handleChanged} value={student? student.firstname : firstname} className={`form-control ${styles.field}`} id="validationCustom01" required />
                    </div>
                    <div className="col-md-4">
                      <label for="validationCustom02" className="form-label">Other names</label>
                      <input type="text" ref={ref} name='othernames' onChange={handleChanged} value={student? student.othernames : othernames} className={`form-control ${styles.field}`} id="validationCustom02" required />
                    </div>
                    <div className="col-md-4">
                      <label for="validationCustom03" className="form-label">Registration number </label>
                      <input type="text" ref={ref} name='regNo' onChange={handleChanged} value={student? student.regNo : regNo} className={`form-control ${styles.field}`} id="validationCustom03" required />
                    </div>
                    <div className="col-md-6">
                      <label for="validationCustom04" className="form-label">Select section</label>
                      <select name='section' value={section} onChange={handleChanged} className={`form-select ${styles.field}`} id="validationCustom04" required>
                        <option selected disabled value=""></option>
                        <option value='secondary'>secondary</option>
                        <option value='primary'>primary</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      {!phaze ?
                        <div className={styles.secondary}>
                          <label for="validationCustom05" className="form-label">Select class</label>
                          <select name='elementry' onChange={handleChanged} value={elementry} className={`form-select ${styles.field}`} id="validationCustom05" required>
                            <option selected disabled value="">class...</option>
                            <option value='activity1'>activity1</option>
                            <option value='activity2'>activity2</option>
                            <option value='activity3'>activity3</option>
                            <option value='nursery1'>nursery1</option>
                            <option value='nursery2'>nursery2</option>
                            <option value='nursery3'>nursery3</option>
                            <option value='basic1'>basic1</option>
                            <option value='basic2'>basic2</option>
                            <option value='basic3'>basic3</option>
                            <option value='basic4'>basic4</option>
                            <option value='basic5'>basic5</option>
                          </select>
                        </div>
                        :
                        <div className={styles.primary}>
                          <label for="validationCustom06" className="form-label">Select class</label>
                          <select name='elementry' onChange={handleChanged} value={elementry} className={`form-select ${styles.field}`} id="validationCustom06" required>
                            <option selected disabled value="">class...</option>
                            <option value='JSS1'>JSS1</option>
                            <option value='JSS2'>JSS2</option>
                            <option value='JSS3'>JSS3</option>
                            <option value='SS1'>SS1</option>
                            <option value='SS2'>SS2</option>
                            <option value='SS3'>SS3</option>
                          </select>
                        </div>}
                    </div>
                    <div className="col-md-6">
                      <label for="validationCustom00" className="form-label">Assesment type</label>
                      <select name='assesment' onChange={handleChanged} value={assesment} className={`form-select ${styles.field}`} id="validationCustom00" required>
                        <option selected disabled value=""></option>
                        <option value='firstTest'>First Test</option>
                        <option value='secondTest'>Second Test</option>
                        <option value='exam'>Exam</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label for="validationCustom07" className="form-label">Academic Term</label>
                      <select name='term' onChange={handleChanged} value={term} className={`form-select ${styles.field}`} id="validationCustom07" required>
                        <option selected disabled value=""></option>
                        <option value='Firstterm'>Firstterm</option>
                        <option value='Secondterm'>Secondterm</option>
                        <option value='Thirdterm'>Thirdterm</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label for="validationCustom08" className="form-label">Date</label>
                      <input name='date' onChange={handleChanged} value={date} type="date" className={`form-control ${styles.field}`} id="validationCustom08" required />
                    </div>
                    <span className={styles.curses}>Respective subjects..</span>
                    {uploaded ? <div className={`${styles.curses} ${styles.msg}`}>Result upload was successful..</div> : ''}
                    {failed ? <div className={`${styles.curses} ${styles.failed}`}>Error !! Failed to upload result</div> : ''}
                    {inputList.map((item, i) => {
                      return (
                        <div key={i} className={`row ${styles.dynamic}`}>
                          <div className="col-md-6">
                            <label for="validationCustom09" className="form-label">Label</label>
                            <input type="text" name='Label' value={item.Label} onChange={e => handleChange(e, i)} className={`form-control ${styles.field}`} id="validationCustom09" required />
                          </div>
                          <div className="col-md-6">
                            <label for="validationCustom010" className="form-label">Value</label>
                            <input type="text" ref={ref} name='Value' value={item.Value} onChange={e => handleChange(e, i)} className={`form-control ${styles.field}`} id="validationCustom010" required />
                          </div>
                          <div className={styles.twobtn}>
                            {inputList.length !== 1 && <button onClick={() => { removeInput(i); }} className={`${styles.inputbtn} ${styles.minus}`} id="add-btn" type="button">-</button>}
                            {inputList.length - 1 === i && <button onClick={(e) => addInput(e, i)} className={`${styles.inputbtn} ${styles.plus}`} id="add-btn" type="button">+</button>}
                          </div>
                        </div>
                      );
                    })}
                    <button onClick={handleSubmit} type="button" class={`btn btn-primary ${styles.submit}`}>Submit student results</button>
                  </form>
                </div>
              </div>
            </div>
            {/* For mobile View */}
            <MobileSidebar open={open} close={close} />
          </>
          :
          <>
            <Unqualified />
          </>}
      </>
      : <SuspenseWork />
  );
};

{/* <pre>
  {JSON.stringify(inputList, null, 2)}
</pre> */}
