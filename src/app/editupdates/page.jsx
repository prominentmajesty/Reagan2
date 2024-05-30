
import React from 'react';
import { auth } from '@/lib/auth';
import styles from './editupdate.module.css'
import EditUpdate from '@/components/portal/editUpdate/EditUpdate';

const page = async ()  => {

    const session = await auth();

  return (
    <>
      <EditUpdate session = {session}/>
    </>
  )
}

export default page;
