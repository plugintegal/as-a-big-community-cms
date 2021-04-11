import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import { FaCircleNotch } from "react-icons/fa";
import swal from "sweetalert";
import { useFormik } from "formik";
import * as Yup from "yup";

import { getSquad, postSquad, updateSquad, deleteSquad } from "../../Services/";

import TitlePage from "../Parts/TitlePage";
import FormInput from "./ChildSquad/FormInput";
import ModalDelete from "./ChildSquad/ModalDelete";

const SquadComponent = () => {
  const initialValues = {
    id: "",
    squads_name: "",
    description: "",
  };

  const onSubmit = (values, { resetForm }) => {
    if (!values.id) {
      postSquad(values.squads_name, values.description)
        .then((data) => {
          if (data.status === 200) {
            setRefreshKey((oldKey) => oldKey + 1);
            swal("Success!", "Create New Data is Successful!", "success");
            resetForm();
          }
        })
        .catch((error) => {
          console.log("Error ", error);
        });
    } else {
      const { squads_name, description } = values;

      updateSquad(values.id, { squads_name, description }).then((data) => {
        if (data.status === 200) {
          setRefreshKey((oldKey) => oldKey + 1);
          swal("Success!", "Update Data is Successful!", "success");
          resetForm();
        }
      });
    }
  };

  const validationSchema = Yup.object({
    squads_name: Yup.string().required("Required!"),
    description: Yup.string().required("Required!"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const [show, setShow] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [squads, setSquads] = useState([]);
  const [squadId, setSquadId] = useState('')

  useEffect(() => {
    getSquad().then((data) => {
      setSquads(data.data.data);
    });
  }, [refreshKey]);

  const handleDelete = (state) => {
    deleteSquad(state).then((data) => {
      if (data.status === 200) {
        swal("Success!", "Delete Data is Successful!", "success");
      }
      setRefreshKey((oldKey) => oldKey + 1);
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
      maxWidth: "300px",
    },
    {
      name: "Action",
      selector: "id",
      cell: (state) => (
        <div>
          {/* <Link
            to={{
              pathname: "/squad/" + state.squads_name.toLowerCase(),
              query: state.id,
            }}
            className="font-medium bg-blue-400 px-3 py-2 rounded-lg mx-2"
          >
            Detail
          </Link> */}
          <button
            onClick={(e) => {
              formik.resetForm();
              formik.values.id = state.id;
              formik.values.squads_name = state.squads_name;
              formik.values.description = state.description;
            }}
            className="font-medium bg-yellow-300 px-3 py-2 rounded-lg mx-2"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setSquadId(state.id);
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
      {squads.length === 0 ? (
        <>
          <div className="w-10/12 h-full fixed bg-white text-center flex justify-center items-center flex-col">
            <span className="">
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
          <TitlePage title="Squad" description="Squad Page" />
          <div className="-mt-10 px-5">
            <div className="flex gap-5">
              <div className="border bg-white rounded-md p-5 w-4/12 h-80">
                <FormInput formik={formik} />
              </div>
              <div className="border bg-white rounded-md p-5 w-8/12">
                <DataTable
                  title="Squad Data"
                  striped={true}
                  noDataComponent="No available Data"
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
              handleDelete={() => handleDelete(squadId)}
              setShow={() => setShow(!show)}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default SquadComponent;
