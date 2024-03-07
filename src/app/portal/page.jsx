import React, {Suspense} from 'react';
import styles from './portal.module.css'
import Portal from '@/components/portal/Portal';
import { auth } from '@/lib/auth';
import Bottom from '@/components/header_and_footer/footer/Bottom';

const PortalPage = async () => {

  const session = await auth();
  return (
    <>
      <Portal session={session}/>
    </>
  )
}

export default PortalPage
