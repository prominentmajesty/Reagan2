'use client';
import React, {useRef, useState, useEffect} from 'react';
import { useReactToPrint } from "react-to-print";
import styles from './Result.module.css';

const Result = ({studentresult}) => {
  console.log(studentresult);

  const [phaze, setPhaze] = useState(false);
  const [result, setResult] = useState(null);

  const dataToPrintRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => dataToPrintRef.current
    });

  const [data, setData] = useState({
    firstname : '',
    othernames : '',
    regNo : '',
    section : '',
    elementry : '', 
    term : '',
  });

  console.log(data);

  const {
    firstname,
    othernames,
    regNo,
    section,
    elementry,
    term,
  } = data

  const checkAssesment = () => {
    try{
      return result? result[data.section].studentClass[data.elementry][data.term].assesment : ''
    }catch(err) {
      console.log(err);
    }
  }

  const checkDate = () => {
    try{
      return result? result[data.section].studentClass[data.elementry][data.term].date : ''
    }catch(err) {
      console.log(err);
    }
  }

  const display =  e => {
    
    try{
      return(
        data.section && data.elementry && data.term ? 
          <div className={`${styles.table_holder}`}>
            {console.log(result[data.section].studentClass[data.elementry][data.term].overall)}
              <table className={`table caption-top ${styles.border_round}`}>
                <thead>
                  <tr>
                    <th scope="col">Number</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Highest Score</th>
                    <th scope="col">First Test</th>
                    <th scope="col">Second Test</th>
                    <th scope="col">Exam Score</th>
                    <th scope="col">Total Score</th>
                    <th scope="col">Average Score</th>
                    <th scope="col">Subject Grade</th>
                    <th scope="col">Subject Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {result[data.section].studentClass[data.elementry][data.term].overall.map((performance, index) => (
                    <tr>
                      <th scope="row">{index+=1}</th>
                      <td>{performance.subject}</td>
                      <td>{performance.highestCore}</td>
                      <td>{performance.firstTest}</td>
                      <td>{performance.secondTest}</td>
                      <td>{performance.exam}</td>
                      <td>{performance.totalScore}</td>
                      <td>{performance.average}</td>
                      <td>{performance.grade}</td>
                      <td>{performance.remark}</td>
                    </tr>
                   ))
                    
                  }
                </tbody>
              </table>
          </div>
        : 
         
         console.log('Data has not yet met the whole Chriteria..')
 
      )
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    studentresult ? setResult(studentresult) : setResult(null);
  },[studentresult]);

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

  return (
    <div className={styles.right_color} ref={dataToPrintRef}>
      {result ? 
        <span className={styles.add_margin}>
          <div className={styles.caption_div}>
            <h4 className={styles.caption}>{data.section && data.elementry && data.term ? `${data.elementry} ${data.term} Result..` : 'Select Section, Class and Term for your Results to Appear..'}</h4>
          </div>
          <form className={`row g-4 needs-validation ${styles.form}`} novalidate>
            <div className="col-md-4">
              <input type="text" name='firstname' onChange={handleChanged} value={result? result.firstname : firstname} className={`form-control ${styles.field}`} id="validationCustom01" required />
              <label className={styles.label}>First name..</label>
            </div>
            <div className="col-md-4">
              <input type="text" name='othernames' onChange={handleChanged} value={result? result.othernames : othernames} className={`form-control ${styles.field}`} id="validationCustom02" required />
              <label className={styles.label}>Other names..</label>
            </div>
            <div className="col-md-4">
              <input type="text" name='regNo' onChange={handleChanged} value={result? result.regNo : regNo} className={`form-control ${styles.field}`} id="validationCustom03" required />
              <label className={styles.label}>Registration number..</label>
            </div>
            <div className="col-md-6">
              <select name='section' value={section} onChange={handleChanged} className={`form-select ${styles.field}`} id="validationCustom04" required>
                <option selected disabled value="">select section</option>
                <option value='secondary'>secondary</option>
                <option value='primary'>primary</option>
              </select>
              <label className={styles.label}>Acedemic section..</label>
            </div>
            <div className="col-md-6">
              {!phaze ?
                <div className={styles.secondary}>
                  <select name='elementry' onChange={handleChanged} value={elementry} className={`form-select ${styles.field}`} id="validationCustom05" required>
                    <option selected disabled value="">Select Class..</option>
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
                  <label className={styles.label}>Student class..</label>
                </div>
                :
                <div className={styles.primary}>
                  <select name='elementry' onChange={handleChanged} value={elementry} className={`form-select ${styles.field}`} id="validationCustom06" required>
                    <option selected disabled value="">Select Class..</option>
                    <option value='JSS1'>JSS1</option>
                    <option value='JSS2'>JSS2</option>
                    <option value='JSS3'>JSS3</option>
                    <option value='SS1'>SS1</option>
                    <option value='SS2'>SS2</option>
                    <option value='SS3'>SS3</option>
                  </select>
                  <label className={styles.label}>Student class..</label>
                </div>}
            </div>
            <div className="col-md-6">
              <input type="text" name='assesment' placeholder='Assesment..' value={checkAssesment()} className={`form-control ${styles.field} ${styles.placeholder}`} id="validationCustom00" required />
              <label className={styles.label}>Assesment..</label>
            </div>
            <div className="col-md-4">
              <select name='term' onChange={handleChanged} value={term} className={`form-select ${styles.field}`} id="validationCustom07" required>
                <option selected disabled value="">Select Term</option>
                <option value='Firstterm'>Firstterm</option>
                <option value='Secondterm'>Secondterm</option>
                <option value='Thirdterm'>Thirdterm</option>
              </select>
              <label className={styles.label}>Academic term..</label>
            </div>
            <div className="col-md-4">
              <input type="text" placeholder='Date..' name='date' value={checkDate()} className={`form-control ${styles.field} ${styles.placeholder}`} id="validationCustom08" required />
              <label className={styles.label}>Date..</label>
            </div>
            <span className={styles.curses} onClick={handlePrint}>Print Result..</span>
          </form>
          {display()}
        </span>
        : 

        ''
      }
    </div>
  )
}

export default Result;