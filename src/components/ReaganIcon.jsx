import React from 'react';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Quicksand } from 'next/font/google';

import { images } from '@/constants';

const quicksand = Quicksand({ subsets: ['latin'] })

function ReaganIcon() {
  return (
    <div className='container_'>
      <Image src={images.SRHS} className='image_' />
      <div className='label'>
        <h2 className={`${quicksand.className} add_color`} >Supreme Reagan High School</h2>
        <h4 className={`${quicksand.className} add_color`}>The power house of Arts Science and Technology</h4>
      </div>
    </div>
  )
}

export default ReaganIcon
