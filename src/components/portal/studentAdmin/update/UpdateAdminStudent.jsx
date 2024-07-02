'use client';
import React, {useState, useEffect} from 'react';
import { MdClose } from "react-icons/md";
import styles from './update.module.css';

const UpdateAdminStudent = ({detail,close}) => {

    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState(false);

    const [state, setState] = useState({
        firstname : detail.firstname,
        othernames : detail.othernames,
        age : detail.age,
        gender : detail.gender,
        classAdmited : detail.classAdmited,
        section : detail.section,
        parentphone : detail.parentphone
    });

    const {
        firstname,
        othernames,
        age,
        gender,
        classAdmited,
        section,
        parentphone
    } = state

    const handleChage = e => {
        setState({...state, [e.target.name] : e.target.value})
    }

    const handleSubmit = async () => {
        // const getArr = detail.regNo;
        // var arr = getArr.split("");
        // arr.splice(3, 1);
        // arr.splice(7, 1);
        // const regNo = arr.join('');

        try{

            const doc = await fetch(`/api/user/editStudent/${detail._id}`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    firstname,
                    othernames,
                    age,
                    gender,
                    classAdmited,
                    section,
                    parentphone
                })
            });

            if(doc.status === 200){
                setAlert(true);
                setMessage(true);
                setTimeout(() => {
                    setAlert(false);
                    setMessage(false);
                }, 3500)
            }else{
                setAlert(true);
                setMessage(false);

                setTimeout(() => {
                    setAlert(false);
                }, 3500);
            }

        }catch(err){
            console.log(err);
        }
    }
    
    return (
    <div className={styles.update}>
        <div className={styles.close}>
            <MdClose onClick={() => {close()}} className={styles.close_btn} color='white' size={30} />
        </div>
        <div className={styles.content}>
            <div className={styles.caption}>
                <h4>Update student's details..</h4>
            </div>
            {
                alert ?
                    <div className={styles.alert_container}>
                        {
                            message ? 
                            <div class="alert alert-success" role="alert">
                                Success !! Details were successfuly updated
                            </div>
                            :
                            <div class="alert alert-danger" role="alert">
                                Oops!! Could not update student details.
                            </div>
                        }
                    </div>
                : ''
            }
            <div class="mb-3">
                <label for="exampleFormControlInput1" className="form-label">First name</label>
                <input type="text" onChange={handleChage} value={firstname} name='firstname' className="form-control" id="exampleFormControlInput1"/>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput2" className="form-label">Other names</label>
                <input name='othernames' onChange={handleChage} value={othernames} type="text" className="form-control" id="exampleFormControlInput2"/>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput3" className="form-label">Age</label>
                <input name='age' onChange={handleChage} value={age} type="text" className="form-control" id="exampleFormControlInput3"/>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput4" className="form-label">gender</label>
                <input name='gender' onChange={handleChage} value={gender} type="text" className="form-control" id="exampleFormControlInput4"/>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput5" className="form-label">Class admitted</label>
                <input name='classAdmited' onChange={handleChage} value={classAdmited} type="text" className="form-control" id="exampleFormControlInput5"/>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput6" className="form-label">Section</label>
                <input name='section' onChange={handleChage} value={section} type="text" className="form-control" id="exampleFormControlInput6"/>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput7" className="form-label">Parent number</label>
                <input name='parentphone' onChange={handleChage} value={parentphone} type="text" className="form-control" id="exampleFormControlInput7"/>
            </div>
            <div class="d-grid gap-2">
                <button onClick={handleSubmit} class="btn btn-primary" type="button">Submit student updated details</button>
            </div>
        </div>
    </div>
  )
}

export default UpdateAdminStudent;
