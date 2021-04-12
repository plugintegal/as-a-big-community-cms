import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import FormInputBatch from "./ChildBatch/FormInputBatch";
import { BiChevronDown } from "react-icons/bi";
import {
  getAllBatch,
  postBatch,
  updateBatch,
  deleteBatch,
} from "../../Services/batch.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";

import TitlePage from "../Parts/TitlePage";
import LoadingPage from "../Parts/LoadingPage";
import ModalDeleteBatch from './ChildBatch/ModalDeleteBatch';

const BatchComponent = () => {
  const [batches, setBatches] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [show, setShow] = useState(false);

  const initialValues = {
    id: "",
    batch_name: "",
    week: "",
  };

  const onSubmit = (values, { resetForm }) => {
    const { batch_name, week } = values;
    if (!values.id) {
      postBatch({ batch_name, week })
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
      updateBatch({ batch_name, week }, values.id)
        .then((data) => {
          if (data.status === 200) {
            setRefreshKey((oldKey) => oldKey + 1);
            swal("Success!", "Update Data is Successful!", "success");
            resetForm();
          }
        })
        .catch((error) => {
          console.log("Error ", error);
        });
    }
  };

  const validationSchema = Yup.object({
    batch_name: Yup.string().required("Required!"),
    week: Yup.string().required("Required!"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const getBatches = () => {
    getAllBatch()
      .then((data) => {
        setBatches(data.data.data);
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  };

  const handleDelete = (id) => {
    deleteBatch(id)
    .then((data) => {
      if (data.status === 200) {
        setRefreshKey((oldKey) => oldKey + 1);
        swal("Success!", "Delete Data is Successful!", "success");
        formik.resetForm()
        setShow(false)
      }
    })
    .catch((error) => {
      console.log("Error ", error);
    });
  }

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
          <button
            onClick={(e) => {
              formik.resetForm();
              formik.values.id = state.id;
              formik.values.batch_name = state.batch_name;
              formik.values.week = state.week;
            }}
            className="font-medium bg-yellow-300 px-3 py-2 rounded-lg mx-2"
          >
            Edit
          </button>
          <button 
          onClick= {() => {
            formik.values.id = state.id
            setShow(!show)
          }}
          className="font-medium text-white bg-red-400 px-3 py-2 rounded-lg mx-2">
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
          <TitlePage title="batch" description="Batch Page" />
          <div className="-mt-10 px-5">
            <div className="flex gap-5">
              <div className="border bg-white rounded-md p-5 w-4/12 h-48">
                <FormInputBatch formik={formik} />
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
          {show ? (
            <ModalDeleteBatch
              handleDelete={() => handleDelete(formik.values.id)}
              setShow={() => setShow(!show)}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default BatchComponent;
