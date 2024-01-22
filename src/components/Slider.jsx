import React from 'react';
import Image from 'next/image';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { images } from '@/constants';
import { Quicksand } from 'next/font/google';

// liberay import
import styles from './../app/global.css';

const quicksand = Quicksand({ subsets: ['latin'] });

function Slider() {

  return (
    <div className='Div-ontop'>
        <div className='left-side'>
            <Carousel width={400} height={300} pause={false} controls={false} indicators={false}>
                <Carousel.Item>
                    <Image src={images.computer} className='hide-image' width={400} height={300}></Image>
                    <Carousel.Caption>
                        <h2 className={`${quicksand.className} add-font increase-size`}>Reagan's student ICT section..</h2>
                        <h4 className={`${quicksand.className} add-font`}>It's all starts here, becoming a software<br/> developer</h4>
                    </Carousel.Caption> 
                </Carousel.Item>
                
                <Carousel.Item>
                    <Image src={images.classroom} className='hide-image' width={400} height={300}></Image>
                    <Carousel.Caption>
                        <h2 className={`${quicksand.className} add-font increase-size`}>Supreme Reagan Classroom..</h2>
                        <h4 className={`${quicksand.className} add-font`}>Conducive and academic standard<br/>classroom for learning</h4>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image src={images.liberary} className='hide-image' width={400} height={300}></Image>
                    <Carousel.Caption>
                        <h2 className={`${quicksand.className} add-font increase-size`}>Reagan conducive liberary..</h2>
                        <h4 className={`${quicksand.className} add-font`}>Where students cultivate the culture of<br /> studying and learning</h4>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image src={images.recreational} className='hide-image' width={400} height={300}></Image>
                    <Carousel.Caption>
                        <h2 className={`${quicksand.className} add-font increase-size`}>Reagan recreational..</h2>
                        <h4 className={`${quicksand.className} add-font`}>Adequate physical and health excersize <br/>for mental well being</h4>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image src={images.musical} className='hide-image' width={400} height={300}></Image>
                    <Carousel.Caption>
                        <h2 className={`${quicksand.className} add-font increase-size`}>Reagan musical..</h2>
                        <h4 className={`${quicksand.className} add-font`}>Shows & numerous Choir concerts and <br/>host of other productions</h4>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
      <div className='right-side'>

      </div>
    </div>
  )
}

export default Slider;
