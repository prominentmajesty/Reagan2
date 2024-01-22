'use client'
import React,{useState} from 'react';
import Link from 'next/link';
import { TiArrowSortedUp } from "react-icons/ti";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";

function MobileAcademics() {
  return (
    <div className='mobile-academics'>
      <hr className='hr'/>
        <div className="mobile-academic-container">
            <div className="mobile-left-academy add-wrap">
                <h4 className='discover-heading align-with-pad'>Reagan Academic</h4>
                <p className='discover-paragraph align-with-pad'>Our academic results compete with the very best in Nigeria and go some way to reflect the talent, hard work and growth mindset of our students - although our leavers do that best for themselves.</p>
                <div className="righthand-side_">
                    <div className='righthand-sid-div-button add-feature add-F'><h6 className='write-upss'>Student Results<IoArrowForwardCircleSharp className='ar' /></h6></div>
                    <div className='righthand-sid-div-button add-feature add-F' id='add-pad-marg'><h6 className='write-upss'>Student Transcripts<IoArrowForwardCircleSharp className='ar'/></h6></div>
                </div>
            </div>
            <div className="discover-right add-wrap">
                <div className="junior-school-corricolum">
                    <h5 className="h5-class">Supreme Reagan Alumnae</h5>
                    <div className="p-for-h5-class">
                    We value our alumnae community hugely and hope that, whatever you are doing now, you will enjoy being part of our alumnae network, staying in touch with friends, telling us your news, and above all, remaining a part of the ongoing life of our school.
                    </div>
                </div>
                <div className="senior-school-corricolum">
                    <h5 className="h5-class">Student Admission</h5>
                    <div className="p-for-h5-class">
                    We are delighted that you are considering applying for admission at supreme reagan high schools. Click on the hoverable link above to continue with your application.
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MobileAcademics;
