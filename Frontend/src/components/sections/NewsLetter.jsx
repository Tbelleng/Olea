import React from "react";
import NewsLetterForm from "./NewsLetterForm";

const NewsLetter = () => {
  return (
    <section className="py-[40px] lg:py-[88px] bg-newsletter bg-cover">
      <div className="container mx-auto ">
        <div
          className="flex flex-col lg:flex-row items-center justify-between bg-green p-12 rounded-2xl lg:bg-newsletterBox lg:bg-no-repeat lg:h-[216px] text-white"
        >
          <div className="flex-1 w-full">
            <h3 className="h3 mb-4">Free Quote</h3>
            <p className="max-w-[348px] mb-8">
            start the process now for your future funding.
            </p>
          </div>
          <NewsLetterForm />
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
