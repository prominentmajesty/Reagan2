'use client'
import React from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";
import { TiArrowSortedUp } from "react-icons/ti";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { Quicksand } from 'next/font/google';
import Link from 'next/link';

function MobileLife() {
  return (
    <div className='sub-container'>
      <div className="div-1 for-sub-container">
        <h2 className="life-heading">Life at Reagan</h2>
        <h6 className="life-at-reagan-text">We are high-achieving and down-to-earth and offer an academic and broad curriculum with a very modern edge.</h6>
      
        <div className="for-sub-container2">
          <div className='div-to-button first'>
            <h6 className='line-h'>Junior School Sports</h6>
            <IoArrowForwardCircleSharp className='first-arrow arrow' size={20}/>
          </div>
          <div className='div-to-button second'>
            <h6 className='line-h'>Senior School Sports</h6>
            <IoArrowForwardCircleSharp className='second-arrow arrow' size={20}/>
          </div>
        </div>
      </div>
      <div className="div-2 for-sub-container">
        <ul>
          <li className='middle'><Link className='li-link' href=''><FaLongArrowAltRight size={20} className='arrow-right'/>Life at Junior School</Link></li>
          <li className='middle'><Link className='li-link' href=''><FaLongArrowAltRight size={20} className='arrow-right'/>Life at Senior School</Link></li>
          <li className='middle'><Link className='li-link' href=''><FaLongArrowAltRight size={20} className='arrow-right'/>Life at Sixt Form</Link></li>
          <li className='middle'><Link className='li-link' href=''><FaLongArrowAltRight size={20} className='arrow-right'/>Reagan School Bus</Link></li>
          <li className='middle'><Link className='li-link' href=''><FaLongArrowAltRight size={20} className='arrow-right'/>School Uniform</Link></li>
          <li className='middle'><Link className='li-link' href=''><FaLongArrowAltRight size={20} className='arrow-right'/>Launch Menu</Link></li>
          <li className='middle'><Link className='li-link' href=''><FaLongArrowAltRight size={20} className='arrow-right'/>Look Around the School</Link></li>
        </ul>
      </div>
      <div className="div-3 for-sub-container">
      <h5 className='school-mgt'><FaLongArrowAltRight size={20} className='arrow-right'/>School managment</h5>
        <div className='third-content-text-div'>
          It is hugely exciting to be leading a school that is a byword for innovation and thoroughly modern scholarship
        </div>
      </div>
    </div>
  )
}

export default MobileLife;
