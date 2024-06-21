import React from 'react';
import { MdError } from "react-icons/md";
import styles from './adminstudent.module.css';
import TeacherAdmin from '@/components/portal/teacherAdmin/TeacherAdmin';
import { auth } from '@/lib/auth';
import StudentAdmin from '@/components/portal/studentAdmin/StudentAdmin';

const AdminStudent = async () => {

  const session = await auth();

  return (
    <StudentAdmin session={session}/>
  )
}

export default AdminStudent;
