import React, { useState, useEffect } from "react";
import moment from "moment";
import { BiTime, BiMap, BiMoney, BiHourglass } from "react-icons/bi";

import { getEventByIdService, changeStatusParticipantService, sendCertificateToParticipantEventService } from "../../Services";

import { useLocation } from "react-router-dom";

import TitlePage from "../Parts/TitlePage";
import LoadingPage from "../Parts/LoadingPage";

const DetailEventComponent = () => {
  const location = useLocation();
  const eventId = location.state.eventId;
  const [loading, setLoading] = useState(false);
  const [eventDetail, setEventDetail] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const sendEmail = (e) => {
    changeStatusParticipantService(e.target.id)
    .then((data) => {
      setRefreshKey((oldKey) => oldKey + 1);
      console.log("Success")
    })
    .catch((error) => {
      console.log("Error " + JSON.stringify(error.response))
    })
  }

  const sendCertificateToParticipantEvent = () => {
    sendCertificateToParticipantEventService(eventId)
    .then((data) => {
      if(data.status === 200){
        alert("Berhasil")
      }
    })
    .catch((error) => {
      console.log("Error " + error.response)
    })
  }

  useEffect(() => {
    const getDetailEvent = () => {
      getEventByIdService(eventId)
        .then((data) => {
          console.log(data.data.data);
          setEventDetail(data.data.data);
          setLoading(true);
        })
        .catch((error) => {
          console.log(error.response);
        });
    };
    getDetailEvent();
  }, [eventId, refreshKey]);
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
                    {eventDetail.description}
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
                        {eventDetail.in_expired === false ? (
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
            <div className="border bg-white rounded-md p-5 w-full h-auto mt-2">
              <div className="flex justify-end my-3">
                {eventDetail.participants.length > 0 && (<button onClick={sendCertificateToParticipantEvent} className="w-48 bg-blue-500 shadow-lg rounded-lg text-white py-2 font-bold border border-white">Send Certificate</button>)}
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phone Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Payment Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {eventDetail.participants.length > 0 ? (
                    eventDetail.participants.map((participant) => {
                      return (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {participant.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {participant.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {participant.phone}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {participant.payment ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Sudah
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Belum
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {participant.payment ? (
                              <div className="text-sm text-gray-900">
                                <button className="bg-red-500 text-white px-2 py-1 rounded" id={participant.id} onClick={sendEmail}>
                                  Belum Bayar
                                </button>
                              </div>
                            ) : (
                              <div className="text-sm text-gray-900">
                                <button className="bg-blue-500 text-white px-2 py-1 rounded" id={participant.id} onClick={sendEmail}>
                                  Sudah Bayar
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" class="">
                        <div className="flex items-center justify-center text-sm font-medium text-gray-900">
                          <span className="mt-2">Participants not available</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DetailEventComponent;
