import React from "react";
import { useNavigate } from "react-router-dom";
import Starknet from "../../assets/img/starknet.png";

const FeatureSection2 = () => {

  return (
    <section className="py-[30px] lg:py-[120px]">
      <div className="container mx-auto">
        <div className="flex flex-col justify-end items-center lg:flex-row">
          {/* images */}
          <div
            className="flex-1 lg:absolute lg:left-0 order-2 lg:order-1"
            data-aos="fade-right"
            data-aos-offset="400"
          >
            <img src={Starknet} alt="Starknet" draggable="false" />
          </div>
          {/* text */}
          <div
            className="flex-1 max-w-[500px]"
            data-aos="fade-left"
            data-aos-offset="400"
          >
            <h3 className="h3 mb-6">Our future stack</h3>
            <p className="text-slate-700 mb-8">
            Starknet is a zk rollup of etherum to which we will migrate in order to improve security, scalability and reduce fees. 
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection2;
