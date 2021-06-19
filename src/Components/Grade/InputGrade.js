import React, { useState, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextArea from "react-validation/build/textarea";
import { getMemberDetail } from '../../Services/';
import {useLocation} from 'react-router-dom';

const InputGradeComponent = () => {
  const location = useLocation();
  const memberCode = location.state.member_code
  const [memberDetail, setMemberDetail] = useState();

  console.log(memberDetail);

  useEffect(() => {
    getMemberDetail(memberCode)
    .then((data) => {
      setMemberDetail(data.data.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [memberCode])

  return (
    <>
      <div className="bg-gray-300 pt-6 pb-16 px-5 w-full">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xl font-medium font-poppins mb-1">
                PLUG-IN
              </div>
              <div className="text-sm">Grade</div>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-full h-auto">
          <Form>
            <div className="relative mb-4">
              <label htmlFor="grade">Grade (1-100)</label>
              <Input
                type="number"
                name="grade"
                min="1"
                max="100"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Enter Grade"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="description">Description</label>
              <TextArea
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Enter description"
                name="description"
              />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default InputGradeComponent;
