'user client';
import * as React from 'react';
import {useState, useEffect} from 'react';
import { MdClose } from "react-icons/md";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import styles from './editComponent.module.css';

const EditComponent = ({refreshContents, details, close}) => {

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);

  const [state, setState] = useState({
    firstname : details.firstname,
    othernames : details.othernames,
    address : details.address,
    phone : details.phone,
    gender : details.gender,
    LGA : details.LGA,
    city : details.city,
    nationality : details.nationality
  });

  const {
    firstname,
    othernames,
    address,
    phone,
    gender,
    LGA,
    city,
    nationality
  } = state;

  const handleChange = async (e) => {
    setState({...state, [e.target.name] : e.target.value});
  }

  const handleSubmit = async e => {

    try{

      const res = await fetch(`/api/user/parents/${details._id}`,{
        method : 'PATCH',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
          firstname,
          othernames,
          address,
          phone,
          gender,
          LGA,
          city,
          nationality,
        })
      });

      if(res.status === 200){
        setAlert(true);
        setSuccess(true);
        setTimeout(() => {
          setAlert(false);
          setSuccess(false);
          refreshContents()
        },3000);
      }else{
        setAlert(true);
        setError(true);
        setTimeout(() => {
          setAlert(false);
          setError(false);
        },3000)
      }

    }catch(err){
      console.log(err);
      setAlert(true);
      setError(true);

        setTimeout(() => {
          setAlert(false);
          setError(false);
        },3000)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.close_icon}>
        <MdClose onClick={() => {close()}} className={styles.close} color='black' size={30} />
      </div>
      <h4 className={styles.caption}>Edit parent's details..</h4>
      {
        alert ? 
          <div className={styles.alert}>
            {
              success ? 
                <div className={styles.success}>
                  <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="success">Data successfuy updated</Alert>
                  </Stack>
                </div>
              : ''
            }   
            {    
              error ?   
                <div className={styles.error}>
                  <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">Failed to update details.</Alert>
                  </Stack>
                </div>
              : ''
            }
          </div>
        : ''
      }
      <div className={styles.sub_container}>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">First name</label>
          <input name='firstname' value={firstname} onChange={handleChange} type="text" className="form-control" id="exampleFormControlInput1" />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput2" className="form-label">Other names</label>
          <input name='othernames' value={othernames} onChange={handleChange} type="text" className="form-control" id="exampleFormControlInput2" />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput3" className="form-label">Address</label>
          <input name='address' value={address} onChange={handleChange} type="text" className="form-control" id="exampleFormControlInput3" />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput4" className="form-label">Phone</label>
          <input name='phone' value={phone} onChange={handleChange} type="text" className="form-control" id="exampleFormControlInput4" />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput5" className="form-label">Gender</label>
          <input name='gender' value={gender} onChange={handleChange} type="text" className="form-control" id="exampleFormControlInput5" />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput6" className="form-label">LGA</label>
          <input name='LGA' value={LGA} onChange={handleChange} type="text" className="form-control" id="exampleFormControlInput6" />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput7" className="form-label">City</label>
          <input name='city' value={city} onChange={handleChange} type="text" className="form-control" id="exampleFormControlInput7" />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput8" className="form-label">Nationality</label>
          <input name='nationality' value={nationality} onChange={handleChange} type="text" className="form-control" id="exampleFormControlInput8" />
        </div>
        <button onClick={handleSubmit} className={`btn btn-primary ${styles.btnUpdate}`} type="button">Update parent details</button>
      </div>
    </div>
  )
}

export default EditComponent;
