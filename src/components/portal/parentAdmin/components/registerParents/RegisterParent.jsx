'use client';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import styles from './registerParents.module.css';

const RegisterParent = () => {

  const [state, setState] = useState(false);
  const [view, setView] = useState(false);

  const firstname = useRef(null);
  const othernames = useRef(null);
  const address = useRef(null);
  const phone = useRef(null);
  const gender = useRef(null);
  const LGA = useRef(null);
  const city = useRef(null);
  const nationality = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      firstname: firstname.current.value,
      othernames: othernames.current.value,
      address: address.current.value,
      phone: phone.current.value,
      gender : gender.current.value, 
      LGA : LGA.current.value,
      city : city.current.value,
      nationality : nationality.current.value,
    };

    try{

      const res = await fetch('/api/user/parents', {

        method : 'POST',
        'Content-Type' : 'application/json',
        body : JSON.stringify({
          firstname : formData.firstname,
          othernames : formData.othernames,
          address : formData.address,
          phone : formData.phone,
          gender : formData.gender,
          LGA : formData.LGA,
          city : formData.city,
          nationality : formData.nationality
        })
      });

      if(res.status === 200){
        console.log('request was successful.')
        setView(true);
        setState(true);
        setTimeout(() => {
          setView(false)
          setState(false)
        }, 3000);

        firstname.current.value = '';
        othernames.current.value = '';
        address.current.value = '';
        phone.current.value = '';
        gender.current.value = '';
        LGA.current.value = '';
        city.current.value = '';
        nationality.current.value = '';
        
      }else{
        console.log('request was not successful..');
        setView(true);
        setState(false);
        setTimeout(() => {
          setView(false);
          setState(false)
        }, 3000)
      }

    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className={styles.container}>
      
      <h4 className={styles.format_h4}>Enter parent's details</h4>
  
      {
        view ? 
        <Stack sx={{ width: '100%' }} spacing={2}>
        {state ? <Alert variant="filled" severity="success">REGISTRATION WAS SUCCESSFUL.</Alert>
        :  <Alert variant="filled" severity="error">Error !! Failed To Complete Operation</Alert>
        }
      </Stack> 
      : 
        ''
      }
    <form onSubmit={handleSubmit}>
      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <label for="static1" className={`col-sm-2 col-form-label ${styles.label}`}>First name</label>
        <input ref={firstname} type="text" className={`form-control-plaintext ${styles.text}`} id="static1" required/>
      </div>
      
      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <label for="static2" className={`col-sm-2 col-form-label ${styles.label}`}>Other names</label>
        <input ref={othernames} type="text" className={`form-control-plaintext ${styles.text}`} id="static2" required/>
      </div>
      
      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <label for="static3" className={`col-sm-2 col-form-label ${styles.label}`}>Address</label>
        <input ref={address} type="text" className={`form-control-plaintext ${styles.text}`} id="static3" required/>
      </div>
      
      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <label for="static4" className={`col-sm-2 col-form-label ${styles.label}`}>Phone</label>
        <input ref={phone} type="text" className={`form-control-plaintext ${styles.text}`} id="static4" required/>
      </div>
      
      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <label for="static5" className={`col-sm-2 col-form-label ${styles.label}`}>Gender</label>
        <input ref={gender} type="text" className={`form-control-plaintext ${styles.text}`} id="static5" required />
      </div>

      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <label for="static8" className={`col-sm-2 col-form-label ${styles.label}`}>LGA of origin</label>
        <input ref={LGA} type="text" className={`form-control-plaintext ${styles.text}`} id="static8" required/>
      </div>
      
      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <label for="static6" className={`col-sm-2 col-form-label ${styles.label}`}>State of Origin</label>
        <input ref={city} type="text" className={`form-control-plaintext ${styles.text}`} id="static6" required/>
      </div>
      
      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <label for="static7" className={`col-sm-2 col-form-label ${styles.label}`}>Nationality</label>
        <input ref={nationality} type="text" className={`form-control-plaintext ${styles.text}`} id="static7" required/>
      </div>
    
      <button className={`btn btn-primary ${styles.btn}`} type="submit">Register Parents..</button>
    </form>
    
    </div>
  )
}

export default RegisterParent
