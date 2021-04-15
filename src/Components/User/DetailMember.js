import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getMemberDetail } from "../../Services/";
import TitlePage from "../Parts/TitlePage";

const DetailMember = () => {
  const location = useLocation();
  const memberId = location.state.memberId;

  const [memberDetail, setMemberDetail] = useState("");

  const getMemberDetailData = () => {
    getMemberDetail(memberId)
      .then((data) => {
        console.log("Member detail ", data.data.data);
        setMemberDetail(data.data.data);
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  };

  useEffect(() => {
    getMemberDetailData();
  }, [memberId]);

  return (
    <>
      <TitlePage title="Member" description="Member Detail" />
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-5/12 h-auto">
          <div className="flex justify-center items-center w-full p-3">
            <img
              className="w-64 h-64 rounded object-stretch border-double border-8 border-gray-700"
              src="https://images.unsplash.com/photo-1557862921-37829c790f19?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bWFufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
              alt="profil-user"
            />
          </div>
          <div className="flex justify-center items-center w-full p-3">
            <div className="w-80">
              <h1 className="title-font text-center text-2xl mb-4 font-medium text-gray-900">
                {memberDetail.name}
              </h1>
              <div className="text-gray-500 border-b-2 mb-2">
                <span>No PLUG-IN : {memberDetail.member_code}</span>
              </div>
              <div className="text-gray-500 border-b-2 mb-2">
                <span>Username : {memberDetail.username}</span>
              </div>
              <div className="text-gray-500 border-b-2 mb-2">
                <span>Email : {memberDetail.email}</span>
              </div>
              <div className="text-gray-500 border-b-2 mb-2">
                <span>Squad : {memberDetail.squad.squads_name}</span>
              </div>
              <div className="text-gray-500 mb-2">
                <span>QRCODE : </span>
                <div className="flex justify-center">
                  <img  src={memberDetail.qrcode} alt="qrcode"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailMember;
