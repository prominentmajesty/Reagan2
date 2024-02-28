import React from 'react';
import styles from './parents.module.css';
import Parents from '@/components/portal/parents/Parents';
import { auth } from '@/lib/auth';

const ParentPage = async() => {
  const session = await auth();
  return (
    <div>
      <Parents  session={session}/>
    </div>
  )
}

export default ParentPage;
