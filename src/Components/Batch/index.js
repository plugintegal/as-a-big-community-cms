import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import FormInputBatch from "./ChildBatch/FormInputBatch";
import { BiChevronDown } from "react-icons/bi";
import { FaCircleNotch } from "react-icons/fa";
import { getAllBatch } from "../../Services/batch.service";

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
          <div className="w-10/12 h-full fixed bg-white text-center flex justify-center items-center flex-col">
            <span clasName="">
              <FaCircleNotch
                className="animate-spin -mt-16 text-5xl"
                style={{ color: "#27333a" }}
              />
            </span>
            Please Wait ...
          </div>
        </>
      ) : (
        <>
          <div className="bg-gray-300 pt-6 pb-16 px-5 w-full">
            <div className="container mx-auto">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xl font-medium font-poppins mb-1">
                    PLUG-IN
                  </div>
                  <div className="text-sm">Batch Page</div>
                </div>
              </div>
            </div>
          </div>
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
