'use client'
import React from 'react';
import { TiArrowSortedUp } from "react-icons/ti";
import { IoArrowForwardCircleSharp } from "react-icons/io5";

function MobileNews() {
  return (
    <div className='parent-news'>
      <hr className='hr'/>
      <div className='mobile-news-container'>
        <div className="sub-container-for-news">
          <h2 className='font-format'>News</h2>
          <p className="after-reading-matters">Read the latest news and views in post to supreme reagan blog</p>
          <h4 className="view-blog_ reading_">View all blog</h4>
          <div className="for-colunm">
            <p className='yellow-text'>Anthena, Blog, Design, School of thought, Sixth Form, Steam and Stem</p>
            <p className='another-text'>Breath, Blog, Carriers, Community, Ecology, Guest, Interview, Junior Schools, Sixth form, Steam and Stem</p>
          </div>
        </div>
        <div className="news-right sub-container-for-news">
          <h2 className='reading_'>Updates</h2>
          <p className='add-font-style'>Click the link above for regular update on what is going on at Supreme Reagan High Schools</p>
          <div className='sid-div-button'><h6 className='write write-upss'>Online Magazines<IoArrowForwardCircleSharp size={22} className='ar' /></h6></div>
          <div className='sid-div-button'><h6 className='write v'>More on skills <IoArrowForwardCircleSharp size={22} className='ar'/></h6></div>
        </div>
      </div>
    </div>
  )
}

export default MobileNews;
