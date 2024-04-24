'use client';
import React, {useState, useEffect} from 'react';
import styles from './Result.module.css';

const Result = ({studentresult}) => {
  console.log(studentresult);

  const [phaze, setPhaze] = useState(false);
  const [result, setResult] = useState(null);

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

  console.log(data);

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

  const display =  e => {
    
    try{
      return(
        data.section && data.elementry && data.term ? 
          <div className={`${styles.table_holder}`}>
            {console.log(result[data.section].studentClass[data.elementry][data.term].overall)}
              <table class="table caption-top">
                <caption>Results</caption>
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
    <div className={styles.right_color}>
      {result ? 
        <span>
          <div className={styles.caption_div}>
            <h4 className={styles.caption}>Year one First Semester Result..</h4>
          </div>
          <form className={`row g-4 needs-validation ${styles.form}`} novalidate>
            <div className="col-md-4">
              <label for="validationCustom01" className="form-label">First name</label>
              <input type="text" name='firstname' onChange={handleChanged} value={result? result.firstname : firstname} className={`form-control ${styles.field}`} id="validationCustom01" required />
            </div>
            <div className="col-md-4">
              <label for="validationCustom02" className="form-label">Other names</label>
              <input type="text" name='othernames' onChange={handleChanged} value={result? result.othernames : othernames} className={`form-control ${styles.field}`} id="validationCustom02" required />
            </div>
            <div className="col-md-4">
              <label for="validationCustom03" className="form-label">Registration number </label>
              <input type="text" name='regNo' onChange={handleChanged} value={result? result.regNo : regNo} className={`form-control ${styles.field}`} id="validationCustom03" required />
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
            <span className={styles.curses}>Respective Result..</span>
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