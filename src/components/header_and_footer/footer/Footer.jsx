'use client'
import React from 'react';
import Image from 'next/image';
import { BsArrowRightCircleFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";

//Liberary Import
import {images} from '@/constants';

function Footer() {
  return (
    <div className='footer'>
      <div className='footer-row'>
        <div className="write-up-first">
          <p className='add-grey'>
            Supreme Reagan offer places to students with agile minds who we believe will flourish at our school and make the most of the many opportunities on offer.
            Find out more about our admissions process at 2+, 7+ and 11+
          </p>
          <span className="admission-arrow cursor-hand">
            Admissions <span className="admission-arrow"><BsArrowRightCircleFill className='first-arrow-r arrow' size={20} /></span>
          </span>
        </div>
        <div className="write-up-second">
          <span className="junior">Junior School <span className='age'>(2-11)</span></span><br />
          <span className="contact">08034672651</span>
        </div>
      </div>
      <div className='footer-row'>
        <div className="logo">
          <Image src={images.SRHS} className='footer-icon' />
        </div>
        <div className='location'>
          <h6 className='location-h5 add-grey'>
            Spibath Road Akwakuma
            Owerri Imo State
          </h6>
          <h6 className='cursor-hand'>Get Directions <FaMapMarkerAlt className='first-arrow-r arrow' size={20}/></h6>
        </div>
      </div>
      <div className='footer-row'>
        <div className="write-up-first">
          <p className='add-grey'>
            We have an ethos of ‘modern scholarship’ which makes learning challenging, fun and relevant. Lessons are inspiring, exploring everything from entrepreneurship and oracy to designing a sustainable future.
          </p>
          <span className="admission-arrow cursor-hand">
            Portal <span className="admission-arrow"><BsArrowRightCircleFill className='first-arrow-r arrow' size={20} /></span>
          </span>
        </div>
        <div className="write-up-second">
          <span className="junior">Senior School <span className='age'>(11-16)</span></span><br />
          <span className="contact">08034672651</span>
        </div>
      </div>
      <div className='copyright'>
        Copyright &copy; 2010 - {new Date().getFullYear()} Supreme Reagan High School - All Right Reserved
      </div>
    </div>
  )
}

export default Footer
