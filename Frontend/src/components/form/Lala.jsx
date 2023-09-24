import React, { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FiSend } from "react-icons/fi";

import UserForm from "./components/UserForm";
import ReviewForm from "./components/ReviewForm";
import Thanks from "./components/Thanks";
import Steps from "./components/Steps";

import "./Lala.css";

const formTemplate = {
  name: "",
  email: "",
  business_segment: "",
  company_name: "",
  financing: "",
  duration: "",
  rate: "",
  comment: "",
};

function Form() {
  const [data, setData] = useState(formTemplate);
  const [currentStep, setCurrentStep] = useState(0);

  const updateFieldHandler = (key, value) => {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const formComponents = [
    <UserForm data={data} updateFieldHandler={updateFieldHandler} />,
    <ReviewForm data={data} updateFieldHandler={updateFieldHandler} />,
    <Thanks data={data} />,
  ];

  const changeStep = (step) => {
    if (step >= 0 && step < formComponents.length) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h2>Form</h2>
        <p>
        </p>
      </div>
      <div className="form-container">
        <Steps currentStep={currentStep} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (currentStep === 1) {

              changeStep(formComponents.length - 1);
            } else {
              changeStep(currentStep + 1);
            }
          }}
        >
          <div className="inputs-container">{formComponents[currentStep]}</div>
          <div className="actions">
            {currentStep > 0 && (
              <button type="button" onClick={() => changeStep(currentStep - 1)}>
                <GrFormPrevious />
                <span>Previous</span>
              </button>
            )}
            {currentStep === 1 && (
              <button type="submit">
                <span>Send</span>
                <FiSend />
              </button>
            )}
            {currentStep < formComponents.length - 1 && currentStep !== 1 &&(
              <button type="submit">
                <span>Next</span>
                <GrFormNext />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
