import React, { useState, useEffect } from "react";
import moment from "moment";
import { BiTime, BiMap, BiMoney, BiHourglass } from "react-icons/bi";

import { getEventByIdService } from "../../Services";

import { useLocation } from "react-router-dom";

import TitlePage from "../Parts/TitlePage";
import LoadingPage from "../Parts/LoadingPage";

const DetailEventComponent = () => {
  const location = useLocation();
  const eventId = location.state.eventId;
  const [loading, setLoading] = useState(false);
  const [eventDetail, setEventDetail] = useState("");

  const getDetailEvent = () => {
    getEventByIdService(eventId)
      .then((data) => {
        setEventDetail(data.data.data);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    getDetailEvent();
  }, [eventId]);
  return (
    <>
      {loading === false ? (
        <LoadingPage />
      ) : (
        <>
          <TitlePage title="Event" description="Event Detail Page" />
          <div className="-mt-10 px-5">
            <div className="border bg-white rounded-md p-5 w-full h-auto">
              <div className="grid grid-cols-4 gap-2">
                <div className="w-48 absolute fixed mx-0 shadow rounded border-2">
                  <img
                    className="object-contain rounded h-full w-full"
                    src={eventDetail.image_event}
                    alt="event_image"
                  />
                </div>
                <div className="w-full ml-60 col-span-2">
                  <h3 className="font-bold text-xl text-gray-700 uppercase">
                    {eventDetail.event_name}
                  </h3>
                  <p className="text-gray-700 text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
                <div className="col-start-4">
                  <div className="bg-gray-100 p-2 rounded shadow">
                    <h3 className="text-xl font-bold mb-2">Information</h3>
                    <label className="flex gap-2 items-center">
                      <BiTime className="text-gray-500" />
                      <span className="text-sm text-gray-500 font-normal">
                        {moment(eventDetail.date).format("MMM Do YYYY")}
                      </span>
                    </label>
                    <label className="flex gap-2 items-center">
                      <BiMap className="text-gray-500" />
                      <span className="text-sm text-gray-500 font-normal">
                        {eventDetail.location}
                      </span>
                    </label>
                    <label className="flex gap-2 items-center">
                      <BiMoney className="text-gray-500" />
                      <span className="text-sm text-gray-500 font-normal">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(eventDetail.price)}
                      </span>
                    </label>
                    <label className="flex gap-2 items-center">
                      <BiHourglass className="text-gray-500" />
                      <span className="text-sm text-gray-500 font-normal">
                        { eventDetail.in_expired === false ? (
                            <> Not yet expired </>
                        ) : (
                            <> Expired </>
                        )}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DetailEventComponent;
