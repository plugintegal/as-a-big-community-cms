import React from "react";
import { useSelector } from "react-redux";

import TitlePage from '../Parts/TitlePage';

const DashboardComponent = () => {
  const stateStore = useSelector((state) => state);
  console.log("State Store ", stateStore);
  return (
    <>
      <TitlePage title="Dashboard" description="Dashboard Page"/>
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
