'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

//Liberary Import
import {images} from '@/constants';

function Ratings() {

  const [countStart, setCountStart] = useState(false);


  return (
    <>
      <ScrollTrigger onEnter={() => setCountStart(true)} onExit={() => setCountStart(false)}>
        <div className='ratings'>
          <div className="rating-left rating-margin">
            <div className='rating-heading'>
              <h2 className='count-number'>Our Ratings and Statistics by Individuals & Society</h2>
            </div>
            <div className="rating-left-h5-holder">
              <h5 className="rating-left-h5">
                Giving the school the top ranking of excellent for both academic achievement and personal development, our most recent individual inspection noted that students are highly motivated and aspirational learners and are unafraid to face intellectual challenges while embracing the school’s culture of curiosity and initiative and parents are also very confident to send their children to Supreme reagan for knowladge acquisition.
              </h5>
            </div>
            {countStart && (
              <div className="rating-left-count">
                <div className="count-holder">
                  <CountUp start={0} end={98} duration={6} delay={0} className="count-number" />
                  <h5 className='count-text'>98% Rated in Moral Standards</h5>
                </div>
                <div className="count-holder">
                  <CountUp start={0} end={98} duration={6} delay={0} className="count-number" />
                  <h5 className='count-text'>98% Rated in Academic Standards</h5>
                </div>
                <div className="count-holder">
                  <CountUp start={0} end={95} duration={6} delay={0} className="count-number" />
                  <h5 className='count-text'>95% Rated in External Examination Success</h5>
                </div>
                <div className="count-holder">
                  <CountUp start={0} end={99} duration={6} delay={0} className="count-number" />
                  <h5 className='count-text'>99% Approved snd Recommended by Parents</h5>
                </div>
              </div>
            )}
          </div>
          <div className="rating-below rating-margin">
            <Image src={images.rated2} className='rated-image2' />
          </div>
        </div>
        <div className="rating-top">
          <Image src={images.rated1} className='rated-image rated-image1' />
        </div>
      </ScrollTrigger>
    </>
  )
}

export default Ratings
