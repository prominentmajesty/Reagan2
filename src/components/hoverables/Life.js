'use client';
import React from 'react';
import { TiArrowSortedUp } from "react-icons/ti";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Quicksand } from 'next/font/google';
import Link from 'next/link';

const quicksand = Quicksand({ subsets: ['latin'] });

function Life({value}) {

  console.log(value);

  const content = 'life-at-reagan';

  return (
    <>
        {
          value === content ? 
          <>
            <div 
              className='life-at-reagan'
            >
              <TiArrowSortedUp className='arrow-for-life'/>
              <div
                className='life-at-reagan-child'
              >
                <div className='first-content'>
                  <div className= 'text-heading'><h2 className={`${quicksand.className} first-content-text-heading`}>Life at Reagan</h2></div>
                  <div className={`${quicksand.className}`}><h6 className={`${quicksand.className} text`}>We are high-achieving and down-to-earth and offer an academic and broad curriculum with a very modern edge.</h6></div>
                  <div className='div-to-button first'>
                    <h6 className={`${quicksand.className} line-h`}>Junior School Sports</h6>
                    <IoArrowForwardCircleSharp className='first-arrow arrow' size={20}/>
                  </div>
                  <div className='div-to-button second'>
                    <h6 className={`${quicksand.className} line-h`}>Senior School Sports</h6>
                    <IoArrowForwardCircleSharp className='second-arrow arrow' size={20}/>
                  </div>
                </div>
                <div className='second-content'>
                  <ul>
                    <li className={`${quicksand.className} middle`}><Link className='li-link' href=''><FaLongArrowAltRight size={20} className='arrow-right'/>Life at Junior School</Link></li>
                    <li className={`${quicksand.className} middle`}><Link className='li-link' href=''><FaLongArrowAltRight size={20} className='arrow-right'/>Life at Senior School</Link></li>
                    <li className={`${quicksand.className} middle`}><Link className='li-link' href=''><FaLongArrowAltRight size={20} className='arrow-right'/>Life at Sixt Form</Link></li>
                    <li className={`${quicksand.className} middle`}><Link className='li-link' href=''><FaLongArrowAltRight size={20} className='arrow-right'/>Reagan School Bus</Link></li>
                    <li className={`${quicksand.className} middle`}><Link className='li-link' href=''><FaLongArrowAltRight size={20} className='arrow-right'/>School Uniform</Link></li>
                    <li className={`${quicksand.className} middle`}><Link className='li-link' href=''><FaLongArrowAltRight size={20} className='arrow-right'/>Launch Menu</Link></li>
                    <li className={`${quicksand.className} middle`}><Link className='li-link' href=''><FaLongArrowAltRight size={20} className='arrow-right'/>Look Around the School</Link></li>
                  </ul>
                </div>

                <div className='third-content'>
                  <h5 className='school-mgt'><FaLongArrowAltRight size={20} className='arrow-right'/>School managment</h5>
                  <div className='third-content-text-div'>
                    It is hugely exciting to be leading a school that is a byword for innovation and thoroughly modern scholarship
                  </div>
                </div>
              </div>
            </div>  
          </>
          : 
          ''
        }
    </>
  )
}

export default Life;
