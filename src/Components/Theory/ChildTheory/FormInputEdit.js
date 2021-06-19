import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { BiCloudUpload, BiCheckCircle } from "react-icons/bi";
import * as Yup from "yup";

import {
  getSquad,
  updateTheory,
  getTheoryById,
  getAllBatch,
} from "../../../Services/";

const FormInputEdit = () => {
  const location = useLocation();
  const history = useHistory();

  const theoryId = location.state.idTheory;
  const [filePath, setFilePath] = useState(null);

  const [batches, setBatches] = useState([]);
  const [squads, setSquads] = useState([]);

  let initialValues = {
    gathering: "",
    description: "",
    date: "",
    squad_id: "",
    content: "",
  };

  const onSubmit = (values) => {
    const theoryDataUpdate = new FormData();
    theoryDataUpdate.append("gathering", values.gathering);
    theoryDataUpdate.append("description", values.description);
    theoryDataUpdate.append("date", values.date);
    theoryDataUpdate.append("squad_id", values.squad_id);
    theoryDataUpdate.append("batch_id", values.batch_id);

    updateTheory(theoryDataUpdate, theoryId)
      .then((data) => {
        if (data.data.status === 200) {
          history.push("/theory");
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log("Error");
      });
  };

  const validationSchema = Yup.object({
    gathering: "",
    description: "",
    content: "",
    date: "",
    squad_id: "",
    batch_id: "",
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const getAllBatches = () => {
    getAllBatch()
      .then((data) => {
        setBatches(data.data.data);
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  };

  const getAllSquad = () => {
    getSquad()
      .then((data) => {
        setSquads(data.data.data);
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  };

  useEffect(() => {
    getAllBatches();
    getAllSquad();

    getTheoryById(theoryId).then((data) => {
      console.log("DATA ", data);
      formik.setFieldValue("gathering", data.data.data.gathering);
      formik.setFieldValue("description", data.data.data.description);
      formik.setFieldValue("content", data.data.data.content);
      formik.setFieldValue("date", data.data.data.date.slice(0, 10));
      formik.setFieldValue("squad_id", data.data.data.squad_id);
      formik.setFieldValue("batch_id", data.data.data.batch_id);
    });
    // eslint-disable-next-line
  }, [theoryId]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="relative mb-4 flex justify-between gap-2">
          <div className="w-full">
            <label htmlFor="gathering">Gathering</label>
            <select
              className="w-full py-3 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              name="gathering"
              id="gathering"
              onChange={formik.handleChange}
              value={formik.values.gathering}
              onBlur={formik.handleBlur}
            >
              <option>Choose Gathering</option>
              <option value="1">Week 1</option>
              <option value="2">Week 2</option>
              <option value="3">Week 3</option>
              <option value="4">Week 4</option>
              <option value="5">Week 5</option>
              <option value="6">Week 6</option>
              <option value="7">Week 7</option>
              <option value="8">Week 8</option>
              <option value="9">Week 9</option>
              <option value="10">Week 10</option>
              <option value="11">Week 11</option>
              <option value="12">Week 12</option>
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              id="date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className="relative mb-4">
          <label htmlFor="gathering">Description</label>
          <textarea
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            onBlur={formik.handleBlur}
          ></textarea>
        </div>
        <div className="relative mb-4">
          <label htmlFor="content">Konten</label>
          <div className="flex bg-grey-lighter gap-4">
            <label
              className={
                "w-80 flex flex-col justify-center items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide uppercase border cursor-pointer hover:bg-blue hover:text-white" +
                (filePath !== null
                  ? " text-green-500 border-green-500 "
                  : " text-blue-500 border-blue-500")
              }
              style={{ height: 200 }}
            >
              {filePath !== null ? (
                <>
                  <BiCheckCircle className="text-5xl" />
                  <span className="mt-2 text-base leading-normal">
                    File uploaded
                  </span>
                </>
              ) : (
                <>
                  <BiCloudUpload className="text-5xl" />
                  <span className="mt-2 text-base leading-normal">
                    Select a new file
                  </span>
                </>
              )}
              <input
                type="file"
                className="hidden"
                name="content"
                onChange={(e) => setFilePath(e.target.files)}
              />
            </label>
            <div className="w-80 rounded-lg shadow-lg tracking-wide border border-blue-500">
              <iframe
                title="Content"
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${formik.values.content}`}
                width="100%"
                height="200px"
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="relative mb-4 flex justify-between w-full gap-2">
          <div className="w-full">
            <label htmlFor="squad_id">Squad</label>
            <select
              className="w-full py-3 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              name="squad_id"
              id="squad_id"
              onChange={formik.handleChange}
              value={formik.values.squad_id}
              onBlur={formik.handleBlur}
            >
              <option>Choose Squad</option>
              {squads.map((squad) => {
                return (
                  <option key={"squad" + squad.id} value={squad.id}>
                    {squad.squads_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="squad_id">Batch</label>
            <select
              className="w-full py-3 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              name="batch_id"
              onChange={formik.handleChange}
              value={formik.values.batch_id}
              onBlur={formik.handleBlur}
            >
              <option>Choose Batch</option>
              {batches.map((batch) => {
                return (
                  <option key={"batch" + batch.id} value={batch.id}>
                    {batch.batch_name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="relative mb-3">
          <button
            type="submit"
            className="bg-blue-500 rounded py-2 px-3 text-white w-full"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default FormInputEdit;
