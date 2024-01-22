'use client'
import React from 'react';
import Image from 'next/image';
import {images} from '@/constants';

function Awards() {
  return (
    <section className='award-section'>
      <h4 className='award-section-header'> Reagan Operational Features, <br />Achievements and Awards</h4>
      <div className='awards'>
        <div className="suprem-left-content">
          <Image className='supreme-image' src={images.ICT}/>
          <div className="labels-for-award">
            <h6 className='achievements under-achievements'>ICT Development Center</h6>
            <h5 className='Achievement-title'>Reagan ultra modern information commucation technology development center</h5>
            <p className='paragraph'>5 August, 2023</p>
          </div>
        </div>
        <div className="right-content-award">
          <div className="first-right-image image-both">
            <Image className='starstudent2 img-' src={images.best}/>
            <div className="labels-for-award">
              <h6 className='achievements under-achievements'>Achievement & Celebration</h6>
              <h5 className='Achievement-title'>Reagan Nursery & Primary School best graduating student</h5>
              <p className='paragraph'>6 July, 2023</p>
            </div>
          </div>
          <div className="second-right-image image-both">
            <Image className='star-student img-' src={images.star_student}/>
            <div className="labels-for-award">
              <h6 className='achievements under-achievements'>Achievement & Celebration</h6>
              <h5 className='Achievement-title'>Reagan Secondary School star student and most outstanding</h5>
              <p className='paragraph'>6 July, 2023</p>
            </div>
          </div>
        </div>
      </div>
      <div className="award-second-content">
        <div className="left-award-for-music-and-school">
          <div className="music-award award-award">
            <Image src={images.music} className='second-image-award' />
            <div className="labels-for-award">
              <h6 className='achievements under-achievements'>Music Award & Celebration</h6>
              <h5 className='Achievement-title'>Reagan Secondary School music concert award</h5>
              <p className='paragraph'>19 December, 2023</p>
            </div>
          </div>
          <div className="school-award award-award">
            <Image src={images.trophy1} className='second-image-award' />
            <div className="labels-for-award">
              <h6 className='achievements under-achievements'>Inter School Award</h6>
              <h5 className='Achievement-title'>Winner Best model high School award of the year 2023</h5>
              <p className='paragraph'>6 July, 2023</p>
            </div>
          </div>
        </div>
        <div className="for-tech-right">
          <Image className='image-digital' src={images.online_education}/>
          <div className="labels-for-award">
            <h6 className='achievements under-achievements'>Learning made Dynamic</h6>
            <h5 className='Achievement-title'>Reagan Online Education for Senior Secondary Section</h5>
            <p className='paragraph'>6 July, 2023</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Awards;
