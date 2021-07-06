import React, { useState, useEffect } from "react";

import { getAllBatch, getSquad, getTheories } from "../../Services/";
import DataTable from "react-data-table-component";
import { useHistory, withRouter } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";

import TitlePage from "../../Components/Parts/TitlePage";

const Cash2Component = () => {
  const history = useHistory();
  const [batches, setBatches] = useState([]);
  const [openTab, setOpenTab] = useState(1);
  const [squadChoosed, setSquadChoosed] = useState(1);
  const [squads, setSquad] = useState([]);
  const [theories, setTheory] = useState([]);

  const getDataTheories = (batchId, squadId) => {
    getTheories(batchId, squadId).then((data) => {
      setTheory(data.data.data);
    });
  };

  const handleShowDataCash = (e) => {
    history.push("/list-member-cash", {
      theoryId: e.target.id,
      batchId: openTab,
      squadId: squadChoosed,
    });
  };

  useEffect(() => {
    getSquad().then((data) => {
      setSquad(data.data.data);
      setSquadChoosed(data.data.data[0].id);
    });
  }, []);

  useEffect(() => {
    getTheories(openTab, squadChoosed).then((data) => {
      setTheory(data.data.data);
    });
  }, [squadChoosed, openTab]);

  useEffect(() => {
    getAllBatch()
      .then((data) => {
        setBatches(data.data.data);
        setOpenTab(data.data.data[0].id);
        getDataTheories(data.data.data[0].id, squadChoosed);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setOpenTab, squadChoosed]);

  const columns = [
    {
      name: "Pertemuan",
      selector: "gathering",
      sortable: true,
      cell: (state) => "Pertemuan Ke-" + state.gathering,
    },
    {
      name: "Opsi",
      selector: "id",
      sortable: true,
      cell: (state) => (
        <div>
          <button
            className="bg-blue-700 rounded-lg px-2 py-1 text-white font-bold"
            id={state.id}
            onClick={handleShowDataCash}
          >
            Show
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <TitlePage title="Cash2" description="Cash2 Page" />
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-full h-auto">
          <div className="flex flex-wrap">
            <div className="w-full">
              <ul
                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row "
                role="tablist"
              >
                {batches.map((batch) => {
                  return (
                    <li
                      className="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer border"
                      key={batch.id}
                    >
                      <dive
                        className={
                          "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer " +
                          (openTab === batch.id
                            ? "text-white bg-gray-700"
                            : "text-gray-700 bg-white")
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenTab(batch.id);
                          getDataTheories(batch.id, squadChoosed);
                        }}
                        data-toggle="tab"
                        // href={"#" + data.squads_name.toLowerCase()}
                        role="tablist"
                      >
                        <i className="fas fa-space-shuttle text-base mr-1"></i>{" "}
                        {batch.batch_name}
                      </dive>
                    </li>
                  );
                })}
              </ul>
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 -mt-5 border">
                <div className="py-5 flex-auto">
                  <div className="tab-content tab-space">
                    <div className="w-40 float-right">
                      <select
                        className="w-full py-2 bg-white rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        name="squad"
                        onChange={(e) => setSquadChoosed(e.target.value)}
                      >
                        {squads.map((squad, index) => {
                          return (
                            <option key={index} value={squad.id}>
                              {squad.squads_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    {batches.map((batch) => {
                      return (
                        <div
                          key={batch.id}
                          className={openTab === batch.id ? "block" : "hidden"}
                          id={"#" + batch.batch_name.toLowerCase()}
                        >
                          <DataTable
                            columns={columns}
                            data={theories}
                            // title={`Theory list of ${batch.batch_name.toLowerCase()} batch`}
                            defaultSortField="squads_name"
                            sortIcon={<BiChevronDown />}
                            pagination
                            customStyles={customStyles}
                            className="border-2 rounded shadow"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const customStyles = {
  headCells: {
    style: {
      fontWeigth: "bold",
      fontSize: "16px",
      textAlign: "center",
      textTransform: "uppercase",
      background: "#F9FAFB",
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};

export default withRouter(Cash2Component);
