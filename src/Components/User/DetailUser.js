import React, { useState, useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";

import { getDetailUserService } from "../../Services";

import TitlePage from "../Parts/TitlePage";

const DetailUser = () => {
  const location = useLocation();
  const userId = location.state.userId;

  const [userDetail, setUserDetail] = useState("");

  useEffect(() => {
    const getDetailUser = () => {
      getDetailUserService(userId)
        .then((data) => {
          setUserDetail(data.data.data);
        })
        .catch((error) => {
          alert("Something went wrong");
          console.log("Error ", error);
        });
    };
    getDetailUser();
  }, [userId]);

  return (
    <>
      <TitlePage title="User" description="Detail User" />
      { userDetail.photo }
      <div className="-mt-10 px-5">
        <div className="flex gap-2">
          <div className="border bg-white rounded-md p-5 w-70 h-auto">
            <div className="flex justify-center items-center w-full">
              {userDetail.photo !== null ? (
                <img
                  className="w-64 h-64 rounded object-stretch border-double border-8 border-gray-700"
                  src={userDetail.photo}
                  alt="profil-user"
                />
              ) : (
                <div className="w-64 h-64 rounded-full object-stretch bg-yellow-500">
                  <div className="flex justify-center items-center h-full">
                    <label className="text-white font-bold text-5xl">{ userDetail.name.charAt(0) }</label>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="border col-span-2 bg-white relative fixed rounded-md p-5 w-full h-auto">
            <div className="w-full p-3">
              <label className="text-xl font-bold">Information</label>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(DetailUser);
