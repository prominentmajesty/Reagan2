import React from 'react';
import Admin from '@/components/portal/admin/Admin';
import { auth } from '@/lib/auth';

const AdminPage = async () => {

  const session = await auth();

  return (
    <>
    <Admin session={session}/>
    </>
  )
}

export default AdminPage;
