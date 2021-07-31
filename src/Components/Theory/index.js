import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useHistory, withRouter } from "react-router-dom";
import swal from "sweetalert";

import {
  getSquad,
  getTheories,
  deleteTheory,
  getAllBatch,
} from "../../Services/";
import { BiChevronDown } from "react-icons/bi";

import TitlePage from "../Parts/TitlePage";
import LoadingPage from "../Parts/LoadingPage";
import ModalDeleteTheory from "./ChildTheory/ModalDeleteTheory";
import moment from "moment";

const TheoryComponent = () => {
  const history = useHistory();
  const [refreshKey, setRefreshKey] = useState(0);
  const color = "gray";

  const [batches, setBatches] = useState([]);
  const [theories, setTheory] = useState([]);

  const [squadChoosed, setSquadChoosed] = useState(1);
  const [squads, setSquad] = useState([]);
  const [openTab, setOpenTab] = useState(1);

  const [theoryId, setTheoryId] = useState(0);
  const [show, setShow] = useState(false);

  const messageTheory = useState(localStorage.getItem("THEORY_SUCCESS"))
  const messageTheoryEdit = useState(localStorage.getItem("EDIT_SUCCESS"))

  const getDataTheories = (batchId, squadId) => {
    getTheories(batchId,squadId).then((data) => {
      setTheory(data.data.data);
    });
  };

  const handleCreateNewData = () => {
    history.push("/theory/create");
  };

  const handleDetail = (e) => {
    history.push({
      pathname: "/theory/pertemuan-ke-" + e.target.name,
      state: {
        Name: e.target.name,
        idTheory: e.target.id,
      },
    });
  };

  const handleEdit = (e) => {
    history.push({
      pathname: "/theory/edit/pertemuan-ke-" + e.target.name,
      state: {
        Name: e.target.name,
        idTheory: e.target.id,
      },
    });
  };

  const handleDelete = (e) => {
    deleteTheory(e.target.id)
      .then((data) => {
        if (data.status === 200) {
          swal("Success!", "Delete Data is Successful!", "success");
        }
        setRefreshKey((oldKey) => oldKey + 1);
        setShow(!show);
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  };

  useEffect(() => {
    getSquad().then((data) => {
      setSquad(data.data.data);
      setSquadChoosed(data.data.data[0].id)
    });
    
  }, [])

  useEffect(() => {
    const handleSwal = () => {
      swal("Success!", "Create New Data is Successful!", "success")
      .then(() => {
        localStorage.removeItem("THEORY_SUCCESS");
      });
    }
    if(messageTheory[0] != null){
      handleSwal()
    }
    // eslint-disable-next-line
  }, [messageTheory[0] != null])

  useEffect(() => {
    const handleSwal = () => {
      swal("Success!", "Update Data is Successful!", "success")
      .then(() => {
        localStorage.removeItem("EDIT_SUCCESS");
      });
    }
    if(messageTheoryEdit[0] != null){
      handleSwal()
    }
    // eslint-disable-next-line
  }, [messageTheoryEdit[0] != null])

  useEffect(() => {
    getTheories(openTab,squadChoosed).then((data) => {
      setTheory(data.data.data);
    });
  }, [squadChoosed, openTab])

  useEffect(() => {
    getAllBatch()
    .then((data) => {
        setOpenTab(data.data.data[0].id);
        setBatches(data.data.data);
        getDataTheories(data.data.data[0].id, squadChoosed)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refreshKey, squadChoosed]);

  const columns = [
    {
      name: "Pertemuan",
      selector: "gathering",
      sortable: true,
      cell: (state) => "Pertemuan Ke-" + state.gathering,
    },
    {
      name: "Tanggal",
      selector: "date",
      sortable: true,
      cell: (state) => <> {moment(state.date).format("DD MMMM YYYY")} </>,
    },
    {
      name: "Opsi",
      selector: "id",
      cell: (state) => (
        <>
          <button
            onClick={handleDetail}
            id={state.id}
            name={state.gathering}
            className="font-medium bg-blue-400 px-3 py-2 rounded-lg mx-2"
          >
            Detail
          </button>

          <button
            onClick={handleEdit}
            id={state.id}
            name={state.gathering}
            className="font-medium bg-yellow-400 px-3 py-2 rounded-lg mx-2"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setTheoryId(state.id);
              setShow(!show);
            }}
            className="font-medium text-white bg-red-400 px-3 py-2 rounded-lg mx-2"
          >
            Hapus
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      {theories.length === 0 && openTab === 0 ? (
        <>
          <LoadingPage />
        </>
      ) : (
        <>
          <TitlePage title="theory" description="Theory Page" />
          <div className="-mt-10 px-5">
            <div className="border bg-white rounded-md p-5 w-full h-auto">
              <button
                onClick={handleCreateNewData}
                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
              >
                Create New Theory
              </button>
              <div className="flex flex-wrap">
                <div className="w-full">
                  <ul
                    className="flex mb-0 list-none flex-wrap pt-3 pb-4 gap-2"
                    role="tablist"
                  >
                    {batches.map((batch) => {
                      return (
                        <li
                          className="-mb-px last:mr-0 flex-auto text-center border rounded-lg"
                          key={batch.id}
                        >
                          <div
                            className={
                              "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer " +
                              (openTab === batch.id
                                ? "text-white bg-" + color + "-700"
                                : "text-" + color + "-700 bg-white")
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
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 -mt-5">
                    <div className="py-5 flex-auto border-2 px-5">
                      <div className="tab-content tab-space">
                        <div className="w-40 ml-auto">
                          <select
                            className="w-full py-2 bg-white rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mr-16"
                            name="squad"
                            onChange={(e) => setSquadChoosed(e.target.value)}
                          >
                            {squads.map((squad, index) => {
                              return (<option key={index} value={squad.id}>{squad.squads_name}</option>)
                            })}
                          </select>
                        </div>
                        {batches.map((data) => {
                          return (
                            <div
                              key={data.id}
                              className={
                                openTab === data.id ? "block" : "hidden"
                              }
                              id={"#" + data.batch_name.toLowerCase()}
                            >
                              <DataTable
                                columns={columns}
                                data={theories}
                                title={`Theory list of ${data.batch_name.toLowerCase()} batch`}
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
          {show ? (
            <ModalDeleteTheory
              handleDelete={handleDelete}
              id={theoryId}
              setShow={() => setShow(!show)}
            />
          ) : null}
        </>
      )}
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

export default withRouter(TheoryComponent);
