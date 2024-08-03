'use client';
import React, {useEffect, useState} from 'react';
import styles from './component.module.css';
import ParentModal from '../modal/ParentModal';

const Component = () => {

  const [parents, setParents] = useState([]);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(null);
  const [contact, setContact] = useState({
    search : ''
  });

  const { 
    search
  } = contact

  useEffect(() => {
    try{
      const load_parent = async () => {
        const res = await fetch('/api/user/parents');
        const doc = await res.json();
        setParents(doc);
      };
      load_parent();
    }catch(err){
      console.log(err);
    }
  }, []);

  const handleChage = e => {
    setContact({...contact, [e.target.name] : e.target.value});
  }

  const handleSubmit = async () => {
    try{
      const hold = parents && parents.filter((p) => p.phone === search);

      const res = await fetch(`/api/user/parents/${hold[0].phone}`);
      const doc = await res.json();
      setParents(doc);

    }catch(err){
      console.log(err);
    }
  }

  const open = phone => {
    console.log(phone)
    setData(phone);
    setModal(true)
  }

  const close = e => {
    setModal(false);
  }

  return (
    <>
      {
        modal ? <ParentModal data = {data} close = {close}/> : ''
      }
      <div className={styles.holder}>
        <h4>Parents of Reagan Students</h4>
        <div className={`input-group mb-3 ${styles.search}`}>
          <input 
            name='search' 
            value={search}
            onChange={handleChage}
            type="text" 
            className={
              `form-control ${styles.search_field}`
            } 
            placeholder="Search for parent using phone number.." 
            aria-label="Recipient's username" 
            aria-describedby="button-addon2" 
            required
          />
          <button onClick={handleSubmit} className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
        </div>
        {
          parents ? 
            <>
              {
                Array.isArray(parents) ? 
                  parents.map((parent, index) => (
                    <div key={index} className={`card ${styles.custom_card}`}>
                      <div className={`card-header ${styles.custom_card_header}`}>
                        <h5><b>Parent Name : {parent.firstname} {parent.othernames}</b></h5>
                        <div className={styles.cursor_}>
                          <h6 onClick={() => {open(parent.phone)}} className={styles.cursor_text}>Check Your Children in Reagan</h6>
                        </div>
                      </div>
                      <div className={`card-body ${styles.custom_card_body}`}>
                        <h5 className={`card-title ${styles.custom_card_title}`}>Phone number : {parent.phone}</h5>
                        <p className={`card-text ${styles.custom_card_text}`}><b>Gender</b> : {parent.gender}</p>    
                        <p className={`card-text ${styles.custom_card_text}`}><b>Address</b> : {parent.address}</p>                                                                                                                                                                     
                      </div>
                    </div>
                  ))
                : 
                  <>
                  {
                    <div className={`card ${styles.custom_card}`}>
                      <div className={`card-header ${styles.custom_card_header}`}>
                        <h5><b>Parent Name : {parents.firstname} {parents.othernames}</b></h5>
                        <div className={styles.cursor_}>
                          <h6 onClick={() => {open(parent.phone)}} className={styles.cursor_text}>Check Your Children in Reagan</h6>
                        </div>
                      </div>
                      <div className={`card-body ${styles.custom_card_body}`}>
                        <h5 className={`card-title ${styles.custom_card_title}`}>Phone number : {parents.phone}</h5>
                        <p className={`card-text ${styles.custom_card_text}`}><b>Gender</b> : {parents.gender}</p>    
                        <p className={`card-text ${styles.custom_card_text}`}><b>Address</b> : {parents.address}</p>                                                                                                                                                                     
                      </div>
                    </div>
                  }
                  </>
              }
            </>
          : ''
        }
      </div>
    </>
  )
}

export default Component;
