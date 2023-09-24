import React from "react";
import Smart from "../../assets/img/smart-contract.png";

const FeatureSection1 = () => {
  return (
    <section className="pb-[30px] lg:pb-[120px] pt-0">
      <div className="flex flex-col lg:flex-row">
        <div
          className="max-w-[454px] mb-6 lg:mb-10"
          data-aos="fade-right"
          data-aos-offset="400"
        >
          <h3 className="h3 mb-6">Smart Contract</h3>
          <p className="text-slate-700 mb-8">
          This smart contract, Olea, is an ERC20 token that can be used to issue green bonds, distribute interest, exchange these bonds for ETH, and authorize the owner to trigger token transfers under certain conditions.
          </p>
        </div>
        <div
          className="flex-1 flex justify-end"
          data-aos="fade-left"
          data-aos-offset="400"
        >
          <img src={Smart} alt="Smart" draggable="false" />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection1;
