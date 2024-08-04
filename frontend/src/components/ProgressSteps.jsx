import React from "react";

const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="container flex justify-center items-center">
      <div className={`${step1 ? "text-green-500" : "text-gray-300"}`}>
        <span className="ml-2">Login</span>
        <div className="text-center mt-2 text-lg">✅</div>
      </div>
      {step2 && (
        <>
          {step1 && <div className="h-0.5 w-[10rem] bg-green-500 ml-4"></div>}
          <div className={`${step2 ? "text-green-500" : "text-gray-300"}`}>
            <span className="ml-2">Shipping</span>
            <div className="text-center mt-2 text-lg">✅</div>
          </div>
        </>
      )}
      {step3 && (
        <>
          {step1 && step2 && (
            <div className="h-0.5 w-[10rem] bg-green-500 ml-4"></div>
          )}
          <div
            className={`${step3 ? "text-green-500" : "text-gray-300"}`}
          >
            <span className="ml-4">Summary</span>
            <div className="text-center mt-2 text-lg">✅</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProgressSteps;
