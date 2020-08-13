import React, { useEffect, useState } from "react";
import { getStep, setStep } from "./service/Inspector";
export default (props) => {
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    (async () => {
      setCurrentStep(await getStep());
    })();
  }, []);
  return (
    <div class="container mx-auto pt-5 ">
      <div class="mb-2">
        <div className="text-lg">Monitor</div>
        <div className="flex text-sm">
          Current quest id :{" "}
          <div className="text-white ml-2"> {currentStep}</div>
        </div>
        <input
          type="number "
          class="bg-teal-900"
          onChange={(e) => {
            setCurrentStep(e.target.value);
            setStep(e.target.value).then(() => alert("เรียบร้อย"));
          }}
          value={currentStep}
        />
      </div>
    </div>
  );
};
