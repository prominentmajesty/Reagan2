import React from 'react';
import styles from './profile.module.css';
import Profile from '@/components/portal/profile/Profile';
import { auth } from '@/lib/auth';

const page = async() => {

  const session = await auth();

  return (
    <div>
      <Profile session={session}/>
    </div>
  )
}

export default page;
