import React from 'react';
import { auth } from '@/lib/auth';
import Updates from '@/components/portal/updates/Updates';
import styles from './updates.module.css';

const UpdatePage = async () => {

  const session = await auth();

  return (
    <div>
        <Updates session={session}/>
    </div>
  )
}

export default UpdatePage;
