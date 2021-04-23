import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import TitlePage from "../Parts/TitlePage";
import { getAllEventService } from "../../Services";
import { BiChevronDown } from "react-icons/bi";

const EventComponent = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  const getAllEvent = () => {
    getAllEventService()
      .then((data) => {
        setEvents(data.data.data);
        setLoading(true);
      })
      .then((error) => {
        console.log("Error " + error);
      });
  };

  const handleCreateNewDataEvent = () => {
    history.push("/event-create");
  };

  useEffect(() => {
    getAllEvent();
  }, [loading]);

  const columns = [
    {
      name: "Event Name",
      selector: "event_name",
    },
    {
      name: "Location",
      selector: "location",
    },
    {
      name: "Price",
      selector: "price",
    },
  ];

  return (
    <>
      <TitlePage title="Event" description="Event Page" />
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-full h-auto">
          <div className="my-2">
            <button
              onClick={handleCreateNewDataEvent}
              className="bg-blue-500 px-3 py-2 rounded text-white"
            >
              Create New Data
            </button>
          </div>
          <DataTable
            title="Event Data"
            striped={true}
            noDataComponent="No available Data"
            columns={columns}
            data={events}
            defaultSortField="squads_name"
            sortIcon={<BiChevronDown />}
            pagination
          />
        </div>
      </div>
    </>
  );
};

export default EventComponent;
