'use client'
import React,{useEffect, useState} from 'react';
import Image from 'next/image'
import { images } from '@/constants'; 
import Link from 'next/link';
import { Quicksand } from 'next/font/google';
import {HiOutlineMenuAlt2} from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai';

// liberay import
import Life from './hoverables/Life';
import News from './hoverables/News';
import Discover from './hoverables/Discover';
import Academics from './hoverables/Academics';
import MobileLife from './mobile_navbar/MobileLife';
import MobileNews from './mobile_navbar/MobileNews';
import MobileDiscover from './mobile_navbar/MobileDiscover';
import MobileAcademics from './mobile_navbar/MobileAcademics';

const left_Linkg = [
  {
    key : '1',
    label : 'Home',
    url : '/',
    id : 'home'
  },
  {
    key : '2',
    label : 'Life at Reagan',
    url : '/life',
    id : 'life-at-reagan'
  },
  {
    key : '3',
    label : 'News',
    url : '/news',
    id : 'news'
  },
  {
    key : '4',
    label : 'Gallery',
    url : '/gallery',
    id : 'gallery'
  },
  {
    key : '5',
    label : 'Discover',
    url : '/discover',
    id : 'discover'
  },
  {
    key : '6',
    label : 'Contact Us',
    url : '/contact',
    id : 'contact'
  },
];

const right_Linking = [
  {
    key : '1',
    label : 'Academics',
    url : '/academics',
    id : 'academics'
  },
  {
    key : '2',
    label : 'Events',
    url : '/events',
    id : 'events'
  },
  {
    key : '3',
    label : 'Parents',
    url : '/parents',
    id : 'parents'
  },
  {
    key : '4',
    label : 'Portal',
    url : '/portal',
    id : 'portal'
  },
];

const quicksand = Quicksand({ subsets: ['latin'] });
const get_elems = '';

function Navbar() {

  const [state, setState] = useState(false);
  const [content, setContent] = useState('');

  const execute = e => {
    setContent(e.target.id);
  }

  return (
    <>
      {/* For Desktop Navbar */}
      <Life value={content} />
      <News value={content}/>
      <Discover value={content}/>
      <Academics value={content}/>
      <div className='nav-parent desktop'>
        {
          left_Linkg.map((left) => (
            <Link 
              href={left.url}
              key={left.key} 
              id={left.id} 
              onMouseEnter={(e) => {execute(e)}} 
              className={`${quicksand.className} links`}
            >
              {left.label}
            </Link>
          ))
        }
        {
          right_Linking.map((right) => (
            <Link
              href={right.url} 
              key={right.key} 
              id={right.id} 
              onMouseEnter={(e) => {execute(e)}} 
              className={`${quicksand.className} links align-left`}
            >
              {right.label}
            </Link>
          ))
        }
        <div className='handbuger'>
          <HiOutlineMenuAlt2 size={38} onClick={() => setState(true)} color='white'/>
        </div>
      </div>

      {/*For Mobile Side bar*/}
      <div className={!state ? 'disappear' : 'mobile-sidebar appear'}>
        <AiOutlineClose size={47} color='white' onClick={() => setState(false)} className='move'/> 
        <h4 className='mobile-tags add-margin-to-mobile-home'>Home</h4>
        <hr className='hr'/>
        <MobileLife />
        <MobileNews />
        <hr className='hr'/>
        <h4 className='mobile-tags'>Gallery</h4>
        <MobileDiscover />
        <hr className='hr'/>
        <h4 className='mobile-tags'>Contact Us</h4>
        <MobileAcademics />
        <hr className='hr'/>
        <h4 className='mobile-tags'>Event</h4>
        <hr className='hr'/>
        <h4 className='mobile-tags'>Parents</h4>
        <hr className='hr'/>
        <h4 className='mobile-tags'>Portal</h4>
      </div>
    </>
  )
}//'mobile-sidebar disappear appear'
// className={!state ? 'disappear' : 'mobile-sidebar appear'}
export default Navbar