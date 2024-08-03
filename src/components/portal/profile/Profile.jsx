'use client';
import React, {useEffect,useState} from 'react';
import styles from './profile.module.css';
import Sidebar from '../sidebar/Sidebar';
import HandBurger from '../handburger/Handburger';
import MobileSidebar from '../mobileSidebar/MobileSidebar';
import Unqualified from '../unqualified/Unqualified';
import SuspenseWork from '../suspense/Suspense';
import { useRouter } from 'next/navigation';

const Profile = ({session}) => {

  const [open, setOpen] = useState(false);
  const [state_, setState] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [data, setData] = useState({
    firstname : "",
    othernames : "",
    section : "",
    contact : "",
    LGA : "",
    state : "",
    nationality : "",
    address : "",
  });

  const {
    firstname,
    othernames,
    section,
    contact,
    LGA,
    state,
    nationality,
    address
  } = data

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

  const handleClicked = () => {
    setOpen(true);
  }

  const handleChange = e => {
    setData({...data, [e.target.name] : e.target.value});
  }

  const update_profile = async () => {

    try {
      const profile = await fetch(`/api/user/profile/${state_[0].email}`,{
        method : 'POST',
        'Content-Type' : 'application/json',
        body : JSON.stringify({
          firstname,
          othernames,
          section,
          contact,
          LGA,
          state,
          nationality,
          address
        })
      });

      if(profile.status === 200){
        setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 3200);

      }else{
        setError(true)
        setTimeout(() => {
          setError(false);
        },3200)
      }

    }catch(err){
      console.log(err);
      setError(false);
      setTimeout(() => {
        setError(false);
      },3200);
    }
  }

  return (
    state_ ?
    <>
      {
        state_[0].isTeacher ? 
          <>
            <div className={styles.profile}>
              <Sidebar/>
              <div className={styles.right}>
                <HandBurger open={open} handleClicked={handleClicked}/>
                <div className={styles.right_color}>
                  <div className={styles.caption}>
                    <h5 className={styles.h_series}>Welcome Ugochukwuaugustine7@gmail.com.</h5>
                    <h4 className={styles.h_series}>Update Your Information...</h4>
                  </div>
                  <div className={styles.fields}>
                    {
                      success ?
                        <div class="alert alert-success" role="alert">
                          Success !! Data operation was successful..
                        </div>
                      : ''
                    }
                    {
                      error ? 
                        <div class="alert alert-danger" role="alert">
                          Failed !! could not complete operation..
                        </div>
                      : ''
                    }
                    <div className={`mb-3 row ${styles.add_gap}`}>
                      <label for="firstname" className="col-sm-2 col-form-label">First name</label>
                      <div className="col-sm-10">
                        <input name='firstname' onChange={handleChange} value={firstname} type="text" placeholder='update your first name..' className={`form-control ${styles.text_fields}`} id="firstname" required />
                      </div>
                    </div>
                    <div className={`mb-3 row ${styles.add_gap}`}>
                      <label for="Other names" className="col-sm-2 col-form-label">Other names</label>
                      <div className="col-sm-10">
                        <input name='othernames' onChange={handleChange} value={othernames} type="text" placeholder='update your last name' className={`form-control ${styles.text_fields}`} id="Other names" required/>
                      </div>
                    </div>
                    <div className={`mb-3 row ${styles.add_gap}`}>
                      <label for="section" className="col-sm-2 col-form-label">Section</label>
                      <div className='col-sm-10'>
                        <select name='section' onChange={handleChange} value={section} className={`form-select ${styles.text_fields}`} id='section' aria-label="Default select example">
                          <option selected>update your setion</option>
                          <option value="Primary">Primary section</option>
                          <option value="Secondary">Secondary section</option>
                        </select>
                      </div>
                    </div>
                    <div className={`mb-3 row ${styles.add_gap}`}>
                      <label for="contact" className="col-sm-2 col-form-label">Contact</label>
                      <div className="col-sm-10">
                        <input name='contact' onChange={handleChange} value={contact} type="text" className={`form-control ${styles.text_fields}`} placeholder='update contact' id="contact" required/>
                      </div>
                    </div>
                    <div className={`mb-3 row ${styles.add_gap}`}>
                      <label for="LGA" className="col-sm-2 col-form-label">LGA</label>
                      <div className="col-sm-10">
                        <input name='LGA' onChange={handleChange} value={LGA} type="text" className={`form-control ${styles.text_fields}`} placeholder='LGA' id="LGA" required/>
                      </div>
                    </div>
                    <div className={`mb-3 row ${styles.add_gap}`}>
                      <label for="state" className="col-sm-2 col-form-label">State</label>
                      <div className="col-sm-10">
                        <input name='state' onChange={handleChange} value={state} type="text" className={`form-control ${styles.text_fields}`} placeholder='update your state' id="state" required/>
                      </div>
                    </div>
                    <div className={`mb-3 row ${styles.add_gap}`}>
                      <label for="nationality" className="col-sm-2 col-form-label">Nationality</label>
                      <div className="col-sm-10">
                        <input name='nationality' onChange={handleChange} value={nationality} type="text" className={`form-control ${styles.text_fields}`} placeholder='update your nationality' id="nationality" required/>
                      </div>
                    </div>
                    <div className={`mb-3 row ${styles.add_gap}`}>
                      <label for="address" className="col-sm-2 col-form-label">Address</label>
                      <div className="col-sm-10">
                        <input name='address' onChange={handleChange} value={address} type="text" className={`form-control ${styles.text_fields}`} placeholder='update your address' id="address" required/>
                      </div>
                    </div>
                    <div class="d-grid gap-2">
                      <button onClick={update_profile} className={`btn btn-primary ${styles.btn_styles}`} type="button">Submit changes..</button>
                    </div>
                  </div>
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

export default Profile;
