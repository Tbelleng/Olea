import React from "react";
import { useNavigate } from "react-router-dom";

const NewsLetterForm = () => {
  const navigate = useNavigate();

  return (
    <form className="flex-1 flex flex-col items-start w-full gap-y-6 lg:flex-row lg:gap-x-10">
      <button className="btn bg-white text-darkblue px-8 hover:bg-white/70" onClick={()=> navigate("/form")}>
        Contact Us
      </button>
    </form>
  );
};

export default NewsLetterForm;
