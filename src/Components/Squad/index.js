import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { BiChevronDown, BiPlus } from "react-icons/bi";

import SquadServices from "../../Redux/services/squad.service";

const SquadComponent = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [squads, setSquads] = useState([]);

  useEffect(() => {
    SquadServices.getSquad().then((data) => {
      setSquads(data.data.data);
    });
  });

  const columns = [
    {
      name : 'Squad Name',
      selector : 'squads_name',
      sortable: true
    },
    {
      name : 'Description',
      selector : 'description',
      sortable: true
    },
    {
      name: 'Action',
      cell : () => (
        <div>
          <button className="font-medium bg-yellow-300 px-3 py-2 rounded-lg mx-2">Edit</button>
          <button className="font-medium text-white bg-red-400 px-3 py-2 rounded-lg mx-2">Hapus</button>
        </div>
      )
    }
  ];

  return (
    <>
      <div className="bg-gray-300 pt-6 pb-16 px-5 w-full">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xl font-medium font-poppins mb-1">
                PLUG-IN
              </div>
              <div className="text-sm">Squad Page</div>
            </div>
            <div className="">
              <button class="inline-flex gap-2 items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                Add New Data
                <BiPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-10 px-5">
        <div className="container mx-auto">
          <div className="border bg-white rounded-md p-5">
            <h4 className="font-bold mb-1 text-lg text-gray-600 uppercase">
              Squad Data
            </h4>
            <DataTable
              title="Squad Data"
              columns={columns}
              data={squads}
              defaultSortField="squads_name"
              sortIcon={<BiChevronDown />}
              pagination
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(SquadComponent);
