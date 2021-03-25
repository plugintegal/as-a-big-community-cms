import React from "react";
import {useSelector} from 'react-redux';

const DashboardComponent = () => {
  const stateStore = useSelector((state) => state);
  console.log("State Store ",stateStore);
  return (
    <>
      <div className="bg-transparent pt-6 pb-16 px-3">
        <div className="container mx-auto">
          <div className="flex flex-col">
            <div className="text-2xl font-medium font-poppins mb-1">
              Ini Dashboard
            </div>
            <div className="text-sm -mt-1">
              Ini Dashboard
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardComponent;
