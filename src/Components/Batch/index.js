import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import FormInputBatch from "./ChildBatch/FormInputBatch";
import { BiChevronDown } from "react-icons/bi";
import { getAllBatch } from "../../Services/batch.service";

import TitlePage from '../Parts/TitlePage';
import LoadingPage from '../Parts/LoadingPage';

const BatchComponent = () => {
  const [batches, setBatches] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const getBatches = () => {
    getAllBatch()
      .then((data) => {
        setBatches(data.data.data);
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  };

  useEffect(() => {
    getBatches();
  }, [refreshKey]);

  const columns = [
    {
      name: "Batch Name",
      selector: "batch_name",
      sortable: true,
    },
    {
      name: "Duration (Week)",
      selector: "week",
      sortable: true,
    },
    {
      name: "Action",
      selector: "id",
      maxWidth: "200px",
      cell: (state) => (
        <>
          <button className="font-medium bg-yellow-300 px-3 py-2 rounded-lg mx-2">
            Edit
          </button>
          <button className="font-medium text-white bg-red-400 px-3 py-2 rounded-lg mx-2">
            Hapus
          </button>
        </>
      ),
    },
  ];
  return (
    <>
      {batches.length === 0 ? (
        <>
          <LoadingPage />
        </>
      ) : (
        <>
          <TitlePage title="batch" description="Batch Page"/>
          <div className="-mt-10 px-5">
            <div className="flex gap-5">
              <div className="border bg-white rounded-md p-5 w-4/12 h-48">
                <FormInputBatch
                  setRefreshKey={() => setRefreshKey((oldKey) => oldKey + 1)}
                />
              </div>
              <div className="border bg-white rounded-md p-5 w-8/12">
                <DataTable
                  label="Batch Data"
                  columns={columns}
                  data={batches}
                  defaultSortField="squads_name"
                  sortIcon={<BiChevronDown />}
                  pagination
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BatchComponent;
