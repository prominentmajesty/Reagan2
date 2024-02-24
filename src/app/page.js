import styles from "./page.module.css";
import Image from 'next/image';

//Liberary Import
import Header from "@/components/header_and_footer/header/Header";
import Home from "@/components/home/Home";
import Awards from "@/components/awards/Awards";
import Offer from "@/components/offer/Offer";
import Ratings from "@/components/ratings/Ratings";
import Trust from "@/components/trust/Trust";
import Footer from "@/components/header_and_footer/footer/Footer";
import { auth } from "@/lib/auth";

const HomePage = async () => {

  const session = await auth();

  return (
    <>
      <Header session={session}/>
      <Home />
      <Offer />
      <Awards />
      <Ratings />
      <Trust />
      <Footer />
    </>
  )
}

export default HomePage;

// Computer Science Ptoject Topics
//https://samphina.com.ng/computer-science-project-topics/?gclid=Cj0KCQiAwbitBhDIARIsABfFYII_ExGG2E8hEWkB-O0i2tX3fMeRJLLAT445fnfITr5VkLn1bRbUmHkaAhqREALw_wcB 
