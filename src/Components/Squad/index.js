import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { BiChevronDown, BiPlus } from "react-icons/bi";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextArea from "react-validation/build/textarea";

import SquadServices from "../../Redux/services/squad.service";
import Modal from "../Helpers/Modal";

const SquadComponent = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const [show, setShow] = useState(false);
  const [titleModal, setTitleModal] = useState("");

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
        }
      );
    } else {
      SquadServices.postSquad(squads_name, description)
        .then((data) => {
          console.log("UPDATE BERHASIL");
          setShow(false);
          setRefreshKey((oldKey) => oldKey + 1);
        })
        .catch((error) => {
          console.log("Error ", error.response);
        });
    }
  };

  const handleDelete = (state) => {
    SquadServices.deleteSquad(state);
    setRefreshKey((oldKey) => oldKey + 1);
  };

  const columns = [
    {
      name: "Squad Name",
      selector: "squads_name",
      sortable: true,
    },
    {
      name: "Description",
      selector: "description",
      sortable: true,
    },
    {
      name: "Action",
      selector: "id",
      cell: (state) => (
        <div>
          <button
            onClick={(e) => {
              setTitleModal("Update Squad Data");
              setShow(!show);
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
              handleDelete(state.id);
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
            <div className="">
              <button
                onClick={() => {
                  setTitleModal("Add New Squad Data");
                  setShow(!show);
                  setSquadData({
                    id: "",
                    squads_name: "",
                    description: "",
                  });
                }}
                className="inline-flex gap-2 items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
              >
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
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Modal handleClose={() => setShow(!show)} titleModal={titleModal}>
            <div className="relative mb-4">
              <Input
                type="text"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Enter squad name"
                name="squads_name"
                onChange={(e) => handleChange(e)}
                value={squadData.squads_name}
              />
            </div>
            <div className="relative mb-4">
              <TextArea
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Enter description"
                name="description"
                onChange={(e) => handleChange(e)}
                value={squadData.description}
              />
            </div>
          </Modal>
        </Form>
      ) : null}
    </>
  );
};

export default SquadComponent;
