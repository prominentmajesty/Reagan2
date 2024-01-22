import styles from "./page.module.css";
import Image from 'next/image';

//Liberary Import
import Header from "@/components/header_and_footer/header/Header";
import Home from "@/components/home/Home";
import Awards from "@/components/awards/Awards";
import Offer from "@/components/offer/Offer";
import Ratings from "@/components/ratings/Ratings";
import Trust from "@/components/trust/Trust";

export default function HomePage() {
  return (
    <>
      <Header />
      <Home />
      <Offer />
      <Awards />
      <Ratings />
      <Trust />
    </>
  )
}
