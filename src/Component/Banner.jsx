import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../assets/12banner1.webp";


const Banner = () => {
  return (
    <Carousel className="bg-purple-gradient">
      <div>
        <img src={img1} alt="Banner 1" />
        <p className="legend text-white text-2xl text-center">Welcome to Our Pet Paradise!</p>
       
      </div>
      <div>
        <img src="https://i.ibb.co/z52NjNn/pet-banner-2.jpg" alt="Banner 2" />
        <p className="legend">Caption for Banner 2</p>
      </div>
      <div>
        <img src="https://i.ibb.co/LZ7pqxg/banner-3.jpg" alt="Banner 3" />
        <p className="legend">Caption for Banner 3</p>
      </div>
      <div>
        <img src="https://i.ibb.co/LZ7pqxg/banner-3.jpg" alt="Banner4" />
        <p className="legend">Caption for Banner 4</p>
      </div>
      <div>
        <img src="https://i.ibb.co/z52NjNn/pet-banner-2.jpg" alt="Banner 5" />
        <p className="legend">Caption for Banner 5</p>
      </div>
    </Carousel>
  );
};

export default Banner;
