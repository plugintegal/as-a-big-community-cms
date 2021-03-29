import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import swal from "sweetalert";

import SquadServices from "../../Services/squad.service";

import FormInput from "./ChildSquad/FormInput";
import ModalDelete from "./ChildSquad/ModalDelete";

const SquadComponent = () => {
  const [show, setShow] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [squads, setSquads] = useState([]);
  const [squadData, setSquadData] = useState({
    id: "",
    squads_name: "",
    description: "",
  });

  useEffect(() => {
    SquadServices.getSquad().then((data) => {
      setSquads(data.data.data);
    });
  }, [refreshKey]);

  const handleChange = (e) => {
    setSquadData({ ...squadData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { id, squads_name, description } = squadData;
    if (id !== "") {
      SquadServices.updateSquad(id, { squads_name, description }).then(
        (data) => {
          console.log("UPDATE BERHASIL");
          setShow(false);
          setRefreshKey((oldKey) => oldKey + 1);
          setSquadData({ id: "", squads_name: "", description: "" });
          if (data.status === 200) {
            swal("Success!", "Update Data is Successful!", "success");
          }
        }
      );
    } else {
      SquadServices.postSquad(squads_name, description)
        .then((data) => {
          console.log("UPDATE BERHASIL");
          setShow(false);
          setRefreshKey((oldKey) => oldKey + 1);
          setSquadData({ id: "", squads_name: "", description: "" });
          if (data.status === 200) {
            swal("Success!", "Create new Data is Successful!", "success");
          }
        })
        .catch((error) => {
          console.log("Error ", error.response);
        });
    }
  };

  const handleDelete = (state) => {
    SquadServices.deleteSquad(state).then((data) => {
      if (data.status === 200) {
        swal("Success!", "Delete Data is Successful!", "success");
      }
      setRefreshKey((oldKey) => oldKey + 1);
      setSquadData({ id: "", squads_name: "", description: "" });
      setShow(!show);
    });
  };

  const columns = [
    {
      name: "Squad Name",
      selector: "squads_name",
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Description",
      selector: "description",
      sortable: true,
      maxWidth: "400px",
    },
    {
      name: "Action",
      selector: "id",
      maxWidth: "200px",
      cell: (state) => (
        <div>
          <Link
            to={{ pathname: '/squad/'+state.squads_name.toLowerCase(), query: state.id}}
            className="font-medium bg-blue-400 px-3 py-2 rounded-lg mx-2"
          >
            Detail
          </Link>
          <button
            onClick={(e) => {
              setSquadData({
                id: state.id,
                squads_name: state.squads_name,
                description: state.description,
              });
            }}
            className="font-medium bg-yellow-300 px-3 py-2 rounded-lg mx-2"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setSquadData({ id: state.id });
              setShow(!show);
            }}
            className="font-medium text-white bg-red-400 px-3 py-2 rounded-lg mx-2"
          >
            Hapus
          </button>
        </div>
      ),
    },
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
          </div>
        </div>
      </div>
      <div className="-mt-10 px-5">
        <div className="flex gap-5">
          <div className="border bg-white rounded-md p-5 w-4/12 h-80">
            <FormInput
              onSubmit={handleSubmit}
              onChange={handleChange}
              squads={squadData}
            />
          </div>
          <div className="border bg-white rounded-md p-5 w-8/12">
            <h4 className="font-bold text-lg text-gray-600 uppercase">
              Squad Data
            </h4>
            <DataTable
              columns={columns}
              data={squads}
              defaultSortField="squads_name"
              sortIcon={<BiChevronDown />}
              pagination
            />
          </div>
        </div>
      </div>
      {show ? (
        <ModalDelete
          handleDelete={() => handleDelete(squadData.id)}
          setShow={() => setShow(!show)}
        />
      ) : null}
    </>
  );
};

export default SquadComponent;
