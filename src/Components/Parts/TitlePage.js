import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const TitlePage = ({ title, description }) => {
  return (
    <div className="pt-6 pb-16 px-5 w-full" style={{ background : '#F7F8FC' }}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xl font-bold font-poppins mb-1 uppercase">{title}</div>
            <div className="text-sm flex items-center gap-1">
              PLUG-IN
              <IoIosArrowForward />
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitlePage;
