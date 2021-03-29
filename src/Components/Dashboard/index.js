import React from "react";
import { useSelector } from "react-redux";

const DashboardComponent = () => {
  const stateStore = useSelector((state) => state);
  console.log("State Store ", stateStore);
  return (
    <>
      <div className="bg-gray-300 pt-6 pb-16 px-5 w-full">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xl font-medium font-poppins mb-1">
                PLUG-IN
              </div>
              <div className="text-sm">Dashboard</div>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-4/12 h-40">
          <h5 className="text-gray-700 font-medium text-lg">
            TOTAL
          </h5>
          <span className="text-gray-500 font-thin text-md">Squad</span>
        </div>
      </div>
      </>
  );
};

export default DashboardComponent;
