import React from "react";
import Spline from '@splinetool/react-spline';
import { useNavigate } from "react-router-dom";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto">
      <div className="flex flex-col items-center lg:flex-row">
        {/* Hero text */}
        <div className="flex-1">
          {/* badge test */}
          
          {/* title */}
          <h1
            className="text-[32px] lg:text-[64px] leading-tight mb-6 "
            data-aos="fade-down"
            data-aos-delay="500"
          >
            Innovative Green Bond and Blockchain Solution.
          </h1>
          <p
            className="max-w-[440px] leading-relaxed mb-8"
            data-aos="fade-down"
            data-aos-delay="600"
          >
            OLEA introduces a unique approach to green financing by issuing crypto-backed green bonds, revolutionizing the way environmental projects are funded.
          </p>
          <button
            className="bg-green-500  px-6 py-2 rounded-full text-white text-sm lg:h-16 lg:text-base font-bold gap-x-6"
            data-aos="fade-down"
            data-aos-delay="700"
          >
            <div className="flex items-center justify-betweeen gap-2" onClick={()=> navigate("/form")}>
            Start the process
              <IoIosArrowDroprightCircle className="text-2xl lg:text-3xl" />
            </div>
          </button>
        </div>
        <div className="flex-1">
        <Spline scene="https://prod.spline.design/BCa7RBTfQkACDhq0/scene.splinecode" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
