import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import styles from './viewParents.module.css';
import EditComponent from './editComponent/EditComponent';
import DeleteComponent from './deleteComponent/DeleteComponent';

const ViewParents = () => {

  const [state, setState] = useState(null);
  const [error, setError] = useState(false);
  const [details, setDetails] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [_id, set_Id] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const ref = useRef();

  useEffect(() => {
    const fetchParents = async () => {
      try{

        const res = await fetch('/api/user/parents');
        const doc = await res.json();
        setState(doc);

      }catch(err){
        console.log(err);
      }
    }
    fetchParents();
  }, []);

  useEffect(() => {
    
    if(refresh === true){
      const reload = async() => {
        try{

          const res = await fetch('/api/user/parents');
          if(res.status === 200){
           const result = await res.json(); 
           setState(result);
           setRefresh(false);
          }

        }catch(err){
          console.log(err);
        }
      }
      reload()
    }
    
  }, [refresh])

  const search = async (e) => {

    e.preventDefault();

    const phone = ref.current.value;

    try{
      const res = await fetch('/api/user/parents',
        {
          method : 'PUT',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({
            phone
          })
        }
      );
    
      if(res.status === 200){
        const doc = await res.json();
        setState(doc);
      }else{
        setError(true);
        setState(null)
        setTimeout(() => {
          setError(false)
        }, 3000)
      }
    }catch(err){
      setError(true);
      setState(null)
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }

  const open = (detail) => {

    setDetails(detail);
    setOpenEdit(true);

  }

  const openDeleteModal = (data) => {
    set_Id(data);
    setOpenDelete(true);
  }

  const close = () => {
    setOpenEdit(false);
    setOpenDelete(false);
  }

  const refreshContents = () => {
    setRefresh(true);
  }

  return (
    <div className={styles.container}>
      {openEdit ? <EditComponent refreshContents={refreshContents} details={details} close={close} /> : ''}
      {openDelete ? <DeleteComponent refreshContents={refreshContents} close={close} _id={_id}/> : ''}
      <form onSubmit={search}>
       {
        error ? 
          <div className={styles.error}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error">Failed !! incorrect data or network error </Alert>
            </Stack>
          </div>

        : ""
       }
        <div className={`input-group mb-3 ${styles.search}`}>
          <input ref={ref} name='search' type="text" className={`form-control ${styles.search_field}`} placeholder="Enter phone number" required/>
          <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Search</button>
        </div>
      </form>
      <div className={styles.container_}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">First Name</th>
              <th scope="col">Other Names</th>
              <th scope="col">Address</th>
              <th scope="col">Phone</th>
              <th scope="col">Gender</th>
              <th scope="col">LGA</th>  
              <th scope="col">City</th> 
              <th scope="col">Nationality</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              state ? 
                Array.isArray(state) ? 
                  state.map((doc, index) => (
                    <>
                      <tr key={doc._id}>
                        <th scope="row">{index += 1}</th>
                        <td>{doc.firstname}</td>
                        <td>{doc.othernames}</td>
                        <td>{doc.address}</td>
                        <td>{doc.phone}</td>
                        <td>{doc.gender}</td>
                        <td>{doc.LGA}</td>
                        <td>{doc.city}</td>
                        <td>{doc.nationality}</td>
                        <td>
                          <div className={styles.actions}>
                            <button onClick={() => {open(doc)}} type="button" className={`btn btn-secondary ${styles.update}`}>Update</button>
                            <button onClick={() => {openDeleteModal(doc._id)}} type="button" className={`btn btn-danger ${styles.delete}`}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    </>
                  )) 
                  : <>
                      <tr>
                        <th scope="row">1</th>
                        <td>{state.firstname}</td>
                        <td>{state.othernames}</td>
                        <td>{state.address}</td>
                        <td>{state.phone}</td>
                        <td>{state.gender}</td>
                        <td>{state.LGA}</td>
                        <td>{state.city}</td>
                        <td>{state.nationality}</td>
                        <td>
                          <div className={styles.actions}>
                            <button onClick={()=> {open(state)}} type="button" className={`btn btn-secondary ${styles.update}`}>Update</button>
                            <button onClick={() => {openDeleteModal(state._id)}} type="button" className={`btn btn-danger ${styles.delete}`}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    </>
              : ''
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewParents;
