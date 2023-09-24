import React from "react";
import { Link } from "react-router-dom";
import Nous from "../../assets/img/nous.jpg";

const FeatureSection3 = () => {

  return (
    <section className="py-[30px] lg:py-[120px]">
      <div className="flex flex-col lg:flex-row">
        {/* text */}
        <div>
          <h3 className="h3 mb-6">
            Our Team Of Experts
          </h3>
          <p className="text-slate-700 mb-10 max-w-[408px]">
            Axel Cige, Thomas Bellenger, Imed Retibi, Lucien Fernandez and Axel Izsak
          </p>
        </div>
        <div
          className="flex-1 flex justify-end"
          data-aos="fade-left"
          data-aos-offset="450"
        >
          <img src={Nous} alt="Nous" draggable="false" />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection3;
