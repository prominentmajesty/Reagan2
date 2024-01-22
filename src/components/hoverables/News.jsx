'use client';
import React,{useState} from 'react';
import Link from 'next/link';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TiArrowSortedUp } from "react-icons/ti";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({ subsets: ['latin'] });

function News({value}) {

    console.log(value);
    const content = 'news';

  return (
    <>
        {
            value === content ? 
            <>
                <div className='news'>
                  <TiArrowSortedUp className='arrow-for-new'/>
                  <div className='news-child'>
                    <div className='lefthand-side'>
                      <div className="left-text-one">
                        <b><h4 className={`${quicksand.className} reading-matters`}>Reading matters</h4></b>
                        <p className={`${quicksand.className} after-reading-matters`}>Read the latest news and views in post to supreme reagan blog</p>
                        <div className={`${quicksand.className} view-blog`}><p className='view-blog-4'>View all blog</p></div>
                      </div>
                      <div className="left-text-2">
                        <div className='yellow-text-div'>
                          <p className='yellow-text'>Anthena, Blog, Design, School of thought, Sixth Form, Steam and Stem</p>
                        </div>
                        <div className='yellow-text-div'>
                          <p className='another-text'>Breath, Blog, Carriers, Community, Ecology, Guest, Interview, Junior Schools, Sixth form, Steam and Stem</p>
                        </div>
                      </div>
                    </div>
                    <div className="righthand-side">
                      <h2 className='newsroom'>Newsroom</h2>
                      <p className='newsroom-write-up'>Click the link above for regular update on what is going on at Supreme Reagan High Schools</p>
                      <div className='righthand-sid-div-button'><h6 className='write-upss'>Online Magazines <IoArrowForwardCircleSharp className='ar' /></h6></div>
                      <div className='righthand-sid-div-button'><h6 className='write-upss'>More on skills<IoArrowForwardCircleSharp className='ar'/></h6></div>
                    </div>
                  </div>
                </div>
            </>
             : ''
        }
    </>
  )
}

export default News;
