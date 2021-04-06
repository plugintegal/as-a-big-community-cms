import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { getTheoryById } from "../../Services/";

const DetailTheoryComponent = (props) => {
  const theoryId = props.location.query;

  const [theoryDetail, setTheoryDetail] = useState({});

  const [content, setContent] = useState("");

  const handleSubmit = () => {
    console.log(content);
  };

  useEffect(() => {
    getTheoryById(theoryId)
      .then((data) => {
        setTheoryDetail(data.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, {});

  return (
    <>
      <div className="bg-gray-300 pt-6 pb-16 px-5 w-full">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xl font-medium font-poppins mb-1">
                PLUG-IN
              </div>
              <div className="text-sm">Detail Theory</div>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-full h-auto">
          <div className="font-medium text-lg">Pertemuan Ke-{theoryDetail.gathering}</div>
          <div className="font-sm">{theoryDetail.description}</div>
          <div className="mt-2">
            <iframe
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${theoryDetail.content}`}
              width="80%"
              height="400px"
              frameBorder="0"
            ></iframe>
          </div>
        </div>

        <div>
          <div className="border bg-white rounded-md p-5 w-full h-auto mt-3">
            {theoryDetail.task !== null ? (
              <button className="bg-blue-500 rounded w-full text-center text-white text-medium font-bold py-3">
                Create New Task
              </button>
            ) : (
              <>Ada</>
            )}
          </div>

          {/* <FormInputTask theory_id={theoryDetail.id} /> */}
        </div>
      </div>
    </>
  );
};

export default withRouter(DetailTheoryComponent);
