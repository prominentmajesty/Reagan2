import React from 'react';
import styles from './regNo.module.css';
import { auth } from '@/lib/auth';
import { ResultUpload } from '@/components/portal/resultUpload/ResultUpload';

const ResultUploadPage = async ({params}) => {

    const session = await auth();
    const regNo = params.regNo;
  return (
    <div>
      <ResultUpload regNo={regNo} session={session}/>
    </div>
  )
}

export default ResultUploadPage;