import React from 'react';
import { MdError } from "react-icons/md";
import styles from './adminparents.module.css';
import ParentAdmin from '@/components/portal/parentAdmin/ParentAdmin';
import { auth } from '@/lib/auth';

const AdminParent = async () => {

  const session = await auth();

  return (
    <ParentAdmin session = {session} />
  )
}

export default AdminParent;
