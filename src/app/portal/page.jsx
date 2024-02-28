import React, {Suspense} from 'react';
import styles from './portal.module.css'
import Portal from '@/components/portal/Portal';
import { auth } from '@/lib/auth';

const PortalPage = async () => {

  const session = await auth();
  return (
    <>
      <Portal session={session}/>
    </>
  )
}

export default PortalPage
