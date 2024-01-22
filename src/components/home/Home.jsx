'use client'
import React from 'react';
import Image from 'next/image';
import { images } from '@/constants';
//Libeary import
function Home() {
  return (
    <div className='home-class'>
      <div className="home-up-text">
        <h3 className="first-label home-formate">Academic with a very modern edge</h3>
        <h5 className='home-date home-formate'>Mordern era way of learning {new Date().getFullYear()}</h5>
      </div>
      <div className="home-flex-box">
        <iframe src="https://assets.pinterest.com/ext/embed.html?id=369717450670344161" className='home-image' frameBorder="0" scrolling="1" ></iframe>
        {/* <Image src={images.doctors} className='home-image'/> */}
        <div className='p-holder'>
          <p className="images-doctors-label">
            The best schools are fun, supportive and inspirational environments for young enquiring minds. Supreme Reagan High School is all of that and more.

            Academically high-achieving, rounded and responsible, Supreme Reagan is as down-to earth as it is dynamic.

            We have an ethos of ‘modern scholarship’ which makes learning challenging, fun and relevant. Lessons are inspiring, exploring everything from entrepreneurship and oracy to designing a sustainable future.

            For us, wellbeing is key to everything, from innovative Biophilic Classroom design to our Breathe environmental programme.

            Whoever they are or want to be, students build friendships and develop their intellect knowing they are valued and have the opportunity to make a difference.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home;
