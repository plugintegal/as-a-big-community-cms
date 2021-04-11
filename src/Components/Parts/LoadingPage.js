import React from 'react';
import { FaCircleNotch } from "react-icons/fa";

const LoadingPage = () => {
    return (
        <div className="w-10/12 h-full fixed bg-white text-center flex justify-center items-center flex-col">
            <span clasName="">
              <FaCircleNotch
                className="animate-spin -mt-16 text-5xl"
                style={{ color: "#27333a" }}
              />
            </span>
            Please Wait ...
          </div>
    )
}

export default LoadingPage;