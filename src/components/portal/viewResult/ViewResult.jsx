'use client';
import React, {useEffect,useState} from 'react';
import Sidebar from '../sidebar/Sidebar';
import HandBurger from '../handburger/Handburger';
import MobileSidebar from '../mobileSidebar/MobileSidebar';
import styles from './viewResult.module.css';
import Unqualified from '../unqualified/Unqualified';
import SuspenseWork from '../suspense/Suspense';
import { useRouter } from 'next/navigation';
import Result from '../result/Result';

const ViewResult = ({session}) => {

  const [open, setOpen] = useState(false);
  const [state, setState] = useState(null);
  const [getSearch, setSearch] = useState({
    search : ''
  })
  const [result, setResult] = useState(null);

  const {
    search
  } = getSearch

  const handleChange = e => {
    setSearch({...search, [e.target.name] : e.target.value});

  } 

  const handleSearch = async(arr) => {
    try {
      var arr = arr.split("");
      arr.splice(3, 1);
      arr.splice(7, 1);
      const regNo = arr.join('');
      const data = await fetch(`/api/user/getresult/${regNo}`);
      const res = await data.json();
      setResult(res);
    }catch(err){
      console.log(err);
    }
  }

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

  return (
    <>
      <div className={styles.viewResult}>
        <Sidebar/>
        <div className={styles.right}>
          <HandBurger open={open} handleClicked={handleClicked}/>
          <div className={`input-group mb-3 ${styles.search}`}>
            <input type="text" name='search' value={search} onChange={handleChange} class="form-control" placeholder="Enter Registration Number.." aria-label="Enter Registration Number.." aria-describedby="button-addon2" />
            <button class="btn btn-outline-secondary" onClick={() => {handleSearch(search)}} type="button" id="button-addon2">Search..</button>
          </div>
        <Result studentresult = {result}/>
        </div>
      </div>
      {/* For mobile View */}
      <MobileSidebar open={open} close={close}/>
    </>
    // state ?
      //   <>
      //     {
      //       state[0].isTeacher ? 
      //         <>
      //           <div className={styles.viewResult}>
      //             <Sidebar/>
      //             <div className={styles.right}>
      //               <HandBurger open={open} handleClicked={handleClicked}/>
      //               <div className={styles.right_color}>
      //                 <span>jfdbfdfjopkm hdhjdfjkfjkdf fdhjdfjdfjkdf fdjkdfkjfdjkdf fjkdfjkdfjkdfjkdf fjkfdjkdfjkdfkjldf fdkjfdjkdfkjdfkjdf iorhirhorir kfhofdhiofniof</span>
      //               </div>
      //             </div>
      //           </div>
      //           {/* For mobile View */}
      //           <MobileSidebar open={open} close={close}/>
      //         </>
      //       : 
      //       <>
      //         <Unqualified/>
      //       </>
      //     }
      //   </>
      // : <SuspenseWork />
  )
}

export default ViewResult;


