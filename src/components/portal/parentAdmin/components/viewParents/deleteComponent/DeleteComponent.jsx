import React, {useState} from 'react';
import { MdClose } from "react-icons/md";
import styles from './deleteComponent.module.css';

const DeleteComponent = ({refreshContents, close, _id}) => {

  const [state, setState] = useState(false);

  const closeModal = () => {
    close();
  }

  const deleteParent = async () => {
    try{
      const res = await fetch(`/api/user/parents/${_id}`,{
        method : 'DELETE',
      });
      if(res.status === 200){
        refreshContents();
        close();
      }else{
        setState(true);
        setTimeout(()=> {
          setState(false)
        },3000);
      }
    }catch(err){
      console.log(err);
      setState(true);
        setTimeout(()=> {
          setState(false)
        },3000);
    }
  }
  
  return (
    <div className={styles.container}>
        <div className={styles.close_icon}>
          <MdClose onClick={closeModal} className={styles.close} color='white' size={30} />
        </div>
        <div className={styles.child}>
            <h5 className={styles.h5}>Are you sure you want to delete this update ?? <br /><br/> Be aware that this action cannot be revoked once performed !!</h5>
            <div className={styles.btn_container}>
              <button onClick={closeModal} type="button" className="btn btn-secondary">Cancel</button>
              <button onClick={()=> {deleteParent()}} type="button" className="btn btn-danger">Delete</button>
            </div>
            {state ?
              <div className={styles.errortext}>
                <h5>Could not delete Data due to network error</h5>
              </div>
              : ''
            }
        </div>
    </div>
  )
}

export default DeleteComponent;
