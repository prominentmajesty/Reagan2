'use client'
import React from 'react';
import { FaUserGraduate, FaBookOpenReader, FaPencil, FaCode } from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa";

const Offer = () => {
  return (
    <div className='offer'>
      <div className="offer-card">
        <FaUserGraduate size={50} className='offer-card-icon'/>
        <h4 className="H4-offer">
            Enrollment & Admission
        </h4>
        <h6 className="offer-paragraph">
          Want to apply for admission at supreme reagan high schools. Click on the hoverable button below to continue your application.
        </h6>
        <div className="offer-button">
            <div className='offer-button-sub-div'><label className='offer-label'>Continue Application</label></div>
        </div>
      </div>
      <div className="offer-card">
        <FaBookOpenReader  size={50} className='offer-card-icon'/>
        <h4 className="H4-offer">
            Education & Learning
        </h4>
        <h6 className="offer-paragraph">
            Top notch education and teaching delivered by teachers with world class teaching standards and qualifications
        </h6>
        <div className="offer-button">
            <div className='offer-button-sub-div'><label className='offer-label'>Learn More</label></div>
        </div>
      </div>
      <div className="offer-card">
        <FaPencil size={50} className='offer-card-icon'/>
        <h4 className="H4-offer">
            External Examinations
        </h4>
        <h6 className="offer-paragraph">
            Very good record and mind blowing success in national and international examinations like WAEC, NECO and GCE
        </h6>
        <div className="offer-button">
            <div className='offer-button-sub-div'><label className='offer-label'>Learn More</label></div>
        </div>
      </div>
      <div className="offer-card">
        <FaLaptopCode size={50} className='offer-card-icon'/>
        <h4 className="H4-offer">
            Science & Technology
        </h4>
        <h6 className="offer-paragraph">
            Good background in natural sciences and, stack technologies like software development and engineering
        </h6>
        <div className="offer-button">
            <div className='offer-button-sub-div'><label className='offer-label'>Learn More</label></div>
        </div>
      </div>
    </div>
  )
}

export default Offer
