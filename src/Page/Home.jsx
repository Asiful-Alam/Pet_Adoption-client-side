import Navbar from "../Component/Navbar";
import Banner from "../Component/Banner";
import Category from "../Component/Category";
import { Helmet } from "react-helmet-async";
import CallToActionSection from "../Component/CallToActionSection";
import AboutUsSection from "../Component/AboutUsSection";
import { useLoaderData } from "react-router-dom";


const Home = () => {

  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Navbar></Navbar>
      <Banner></Banner>
      <Category></Category>
      
      <CallToActionSection></CallToActionSection>
      <AboutUsSection></AboutUsSection>
      
    </div>
  );
};

export default Home;
