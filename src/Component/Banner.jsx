import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../assets/12banner1.webp";
// import img2 from "../assets/12banner2.webp";
// import img3 from "../assets/12banner3.webp";
// import img4 from "../assets/12banner4.webp";
// import img5 from "../assets/12banner5.webp";

const Banner = () => {
  return (
    <Carousel>
      <div>
        <img src={img1} alt="Banner 1" />
        <p className="legend text-red-600 text-2xl text-center">Welcome to Our Pet Paradise!</p>
       
      </div>
      <div>
        <img src={img1} alt="Banner 2" />
        <p className="legend">Caption for Banner 2</p>
      </div>
      <div>
        <img src={img1} alt="Banner 3" />
        <p className="legend">Caption for Banner 3</p>
      </div>
      <div>
        <img src={img1} alt="Banner 4" />
        <p className="legend">Caption for Banner 4</p>
      </div>
      <div>
        <img src={img1} alt="Banner 5" />
        <p className="legend">Caption for Banner 5</p>
      </div>
    </Carousel>
  );
};

export default Banner;
