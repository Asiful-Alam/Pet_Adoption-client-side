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
        <p className="legend">Find your furry companion today! Our pet adoption website offers a loving home to pets of all shapes and sizes</p>
      </div>
      <div>
        <img src="https://i.ibb.co/LZ7pqxg/banner-3.jpg" alt="Banner 3" />
        <p className="legend">Welcome to our pet adoption platform, where tails wag and hearts melt. Browse our adorable companions waiting to meet their forever families.</p>
      </div>
      <div>
        <img src="https://i.ibb.co/LZ7pqxg/banner-3.jpg" alt="Banner4" />
        <p className="legend">Discover the joy of pet adoption with us. Every adoption creates a bond that lasts a lifetime.</p>
      </div>
      <div>
        <img src="https://i.ibb.co/z52NjNn/pet-banner-2.jpg" alt="Banner 5" />
        <p className="legend">Unleash love and compassion by adopting a pet from our website. Your new best friend is just a click away.</p>
      </div>
    </Carousel>
  );
};

export default Banner;
