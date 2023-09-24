import React from "react";

// import components
import FeatureSection1 from "./FeatureSection1";
import FeatureSection2 from "./FeatureSection2";
import FeatureSection3 from "./FeatureSection3";

const Features = () => {
  return (
    <section className="pt-12 lg:pt-24 bg-slate-100">
      <div className="container mx-auto">
        <div className="text-center mx-w-[750px] mx-auto mb-24">
          <h2
            className="section-title"
            data-aos="fade-up"
            data-aos-offset="400"
          >
            The world of blockchain is just a click away.
          </h2>
        </div>
        <FeatureSection1 />
        <FeatureSection2 />
        <FeatureSection3 />
      </div>
    </section>
  );
};

export default Features;
