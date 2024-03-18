import React from 'react';
import styles from './regNo.module.css';
import { auth } from '@/lib/auth';
import { ResultUpload } from '@/components/portal/resultUpload/ResultUpload';

const ResultUploadPage = async ({params}) => {

    const session = await auth();
    const reg = params.regNo;
  return (
    <div>
      <ResultUpload reg={reg} session={session}/>
    </div>
  )
}

export default ResultUploadPage;