'use client'
import React, {useState} from 'react';
import Image from 'next/image';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../../app/page.module.css'
import { images } from '@/constants';

//liberary import
import Navbar from '@/components/Navbar';
import Slider from '@/components/Slider';
import ReaganIcon from '@/components/ReaganIcon';
import Shadow from '@/components/Shadow';
import Home from '@/components/home/Home';

function Header() {

  return (
    <>
    <Shadow />
    <Navbar/>
    <ReaganIcon />
    <Slider />
      <div className={styles.editHeight}>
        <Carousel bsPrefix='reduce-hight' fade pause={false} controls={true} indicators={false}>
          <Carousel.Item>
            <Image className='d-block w-100 add-height' height={''} src={images.reagan_house_3}/>
          </Carousel.Item>
          <Carousel.Item>
            <Image className='d-block w-100 add-height' height={''} src={images.reagan_house_2}/>
          </Carousel.Item>
          <Carousel.Item>
            <Image className='d-block w-100 add-height' height={''} src={images.reagan_house_1}/>
          </Carousel.Item>
          <Carousel.Item>
            <Image className='d-block w-100 add-height' height={''} src={images.classroom}/>
          </Carousel.Item>
          <Carousel.Item>
            <Image className='d-block w-100 add-height' height={''} src={images.reagan_classroom_2}/>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  )
}

export default Header
