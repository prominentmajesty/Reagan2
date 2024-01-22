'use client'
import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import { TiArrowSortedUp } from "react-icons/ti";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";

function MobileDiscover() {
  return (
    <div className="parent-discovery">
        <hr className="hr" />
        <div className='mobile-discover'>
          <div className="mobile-left mobile-all-discover">
            <h4 className='discover-heading'>Discover Reagan</h4>
            <p className='discover-paragraph center'>The best schools are fun, supportive and inspirational enviroment for young enquiring minds. Supreme Reagan is all of that and more </p>
            <div className="links-in-dicover">
              <ul className='ul-style'>
                <li><Link href=''className='remove-line'>About</Link></li>
                <li><Link href=''className='remove-line'>Learning</Link></li>
                <li><Link href=''className='remove-line'>Reagan in the community</Link></li>
                <li><Link href=''className='remove-line'>Fees</Link></li>
              </ul>
              <ul className='ul-style'>
                <li><Link href=''className='remove-line'>destination</Link></li>
                <li><Link href=''className='remove-line'>Prospectus</Link></li>
                <li><Link href=''className='remove-line'>Term Dates</Link></li>
                <li><Link href=''className='remove-line'>Policies</Link></li>
              </ul>
            </div>
            <div className="righthand-side_">
              <div className='righthand-sid-div-button add-feature add-F'><h6 className='write-upss'>Senior School Sports <IoArrowForwardCircleSharp className='ar' /></h6></div>
              <div className='righthand-sid-div-button add-feature add-F' id='add-pad-marg'><h6 className='write-upss'>Junior School Sports<IoArrowForwardCircleSharp className='ar'/></h6></div>
            </div>
          </div>
          <div className="discover-right mobile-all-discover">
            <div className="junior-school-corricolum">
              <h5 className="h5-class">Junior School Corriculum</h5>
              <div className="p-for-h5-class">
                At Reagan, students are encouraged to be self-starters, to find their passions and strengths, and to work hard to develop in the areas that might not come as easily to them.
              </div>
            </div>
            <div className="senior-school-corricolum">
              <h5 className="h5-class">Senior School Corriculum</h5>
              <div className="p-for-h5-class">
                With a unique combination of academic rigour and a truly broad education, we will help your child to prepare for a future filled with promise. He/She will learn the skills to question, to work hard and to gain the emotional resilience to know his/her own worth.
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default MobileDiscover;
