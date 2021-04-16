import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  getAllCategoryEventService,
  postCategoryEventService,
  updateCategoryEventService,
  deleteCategoryEventService,
} from "../../Services";
import swal from "sweetalert";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BiChevronDown } from "react-icons/bi";

import TitlePage from "../Parts/TitlePage";
import FormInputCategoryEvent from "./ChildCategoryEvent/FormInputCategoryEvent";
import ModalDeleteCategoryEvent from "./ChildCategoryEvent/ModalDeleteCategoryEvent";

const CategoryEventComponent = () => {
  const [categoryEvent, setCategoryEvent] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [show, setShow] = useState(false);
  const [categoryEventId, setCategoryEventId] = useState("");

  const initialValues = {
    id: "",
    category_name: "",
  };

  const onSubmit = (values, { resetForm }) => {
    if (!values.id) {
      postCategoryEventService(values)
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
      updateCategoryEventService(values.id, {
        category_name: values.category_name,
      })
        .then((data) => {
          if (data.status === 200) {
            setRefreshKey((oldKey) => oldKey + 1);
            swal("Success!", "Update Data is Successful!", "success");
            resetForm();
          }
        })
        .catch((error) => {
          console.log("Error ", error.response);
        });
    }
  };

  const validationSchema = Yup.object({
    category_name: Yup.string().required("Required!"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const getAllCategoryEvent = () => {
    getAllCategoryEventService()
      .then((data) => {
        setCategoryEvent(data.data.data);
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  };

  const handleDelete = (state) => {
    deleteCategoryEventService(state).then((data) => {
      if (data.status === 200) {
        swal("Success!", "Delete Data is Successful!", "success");
      }
      setRefreshKey((oldKey) => oldKey + 1);
      setShow(!show);
    });
  };

  useEffect(() => {
    getAllCategoryEvent();
  }, [refreshKey]);

  const columns = [
    {
      name: "Category EventName",
      selector: "category_name",
    },
    {
      name: "Action",
      selector: "id",
      cell: (state) => (
        <div>
          <button
            onClick={(e) => {
              formik.resetForm();
              formik.values.id = state.id;
              formik.values.category_name = state.category_name;
            }}
            className="font-medium bg-yellow-300 px-3 py-2 rounded-lg mx-2"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setCategoryEventId(state.id);
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
      <TitlePage title="Event" description="Category Event" />
      <div className="-mt-10 px-5">
        <div className="flex gap-5">
          <div className="border bg-white rounded-md p-5 w-4/12 h-48">
            <FormInputCategoryEvent formik={formik} />
          </div>
          <div className="border bg-white rounded-md p-5 w-8/12">
            <DataTable
              title="Squad Data"
              striped={true}
              noDataComponent="No available Data"
              columns={columns}
              data={categoryEvent}
              defaultSortField="category_name"
              sortIcon={<BiChevronDown />}
              pagination
            />
          </div>
        </div>
      </div>
      {show ? (
        <ModalDeleteCategoryEvent
          handleDelete={() => handleDelete(categoryEventId)}
          setShow={() => setShow(!show)}
        />
      ) : null}
    </>
  );
};

export default CategoryEventComponent;
