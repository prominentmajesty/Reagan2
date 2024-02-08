'use client'
import React from 'react';
import Image from 'next/image';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from "react-slick";
import { images } from '@/constants';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({ subsets: ['latin'] });

const Trust = () => {

  return (
    <div className='trust'>
      <div className='trust-caption'>
        <h4 className='hide-and-show'>Vendors that Trust Us</h4>
        <h2 className='trust-caption-h2'>
        True education does not only mean the pursual of a certain course of study. Rather,
        it means more than a preparation for the life that now is.<br/> As a result of this, we are trusted by these Vendors..
        </h2>
      </div>
      <Carousel className='trust-child' width={1000} height={250} pause={false} controls={false} indicators={false}>
        <div className="offer-button ven">
          <div className='offer-button-sub-div'><label className='offer-label'>These are Vendors that Trust Us</label></div>
        </div>
        <Carousel.Item>
          <Image src={images.indomie} className='' width={330} height={250}></Image> 
        </Carousel.Item>
        
        <Carousel.Item>
          <Image src={images.MM} className='' width={330} height={250}></Image>
        </Carousel.Item>
        <Carousel.Item>
          <Image src={images.coke} className='' width={330} height={250}></Image>
        </Carousel.Item>
        <Carousel.Item>
          <Image src={images.premier} className='' width={330} height={250}></Image>
        </Carousel.Item>
        <Carousel.Item>
          <Image src={images.arsenal} className='' width={330} height={250}></Image>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default Trust
