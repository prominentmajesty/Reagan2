import React from 'react';
import styles from './viewresult.module.css';
import ViewResult from '@/components/portal/viewResult/ViewResult';
import { auth } from '@/lib/auth';

const ViewResultPage = async () => {

  const session = await auth();

  return (
    <div>
      <ViewResult session={session}/>
    </div>
  )
}

export default ViewResultPage;
