import React from "react";
import Plantes from "../../assets/img/plantes.png";

const Why = () => {
  return (
    <section className="section">
      <div className="container mx-auto">
        <div className="flex flex-col items-center lg:flex-row gap-x-8">
          <div
            className="order-2 lg:order-1"
            data-aos="fade-right"
            data-aos-offset="400"
          >
            <img src={Plantes} alt="casset" />
          </div>
          <div
            className="order-1 lg:order-2 max-w-[480px]"
            data-aos="fade-left"
            data-aos-offset="400"
          >
            <h2 className="section-title">Blockchain Enhances Transparency In Green Bonds</h2>
            <p className="section-subtitle">
            Our platform leverages blockchain technology for transparency, enabling individuals and institutions to invest in green projects through cryptocurrency-backed bonds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Why;
