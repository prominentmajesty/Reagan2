import React from 'react';
import ResultUpload from '@/components/portal/resultUpload/ResultUpload';
import styles from './resultupload.module.css';
import { auth } from '@/lib/auth';

const ResultUploadPage = async () => {

  const session = await auth()

  return (
    <div>
      <ResultUpload session={session}/>
    </div>
  )
}

export default ResultUploadPage;
