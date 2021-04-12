import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { BiCloudUpload, BiCheckCircle } from "react-icons/bi";
import * as Yup from "yup";

import { getSquad, postTheory, getAllBatch } from "../../../Services/";

const FormInput = () => {
  const history = useHistory();
  const [squads, setSquad] = useState([]);
  const [batches, setBatch] = useState([]);
  const [filePath, setFilePath] = useState(null);

  const initialValues = {
    gathering: "",
    description: "",
    date: "",
    squad_id: "",
    batch_id: "",
  };

  const onSubmit = (values) => {
    const theoryDataPost = new FormData();
    theoryDataPost.append("gathering", values.gathering);
    theoryDataPost.append("description", values.description);
    theoryDataPost.append("date", values.date);
    theoryDataPost.append("squad_id", values.squad_id);
    theoryDataPost.append("batch_id", values.batch_id);
    theoryDataPost.append("content", filePath[0]);

    postTheory(theoryDataPost)
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
    gathering: Yup.string().required("Required!"),
    description: Yup.string().required("Required!"),
    date: Yup.string().required("Required!"),
    squad_id: Yup.string().required("Required!"),
    batch_id: Yup.string().required("Required!"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    getSquad()
      .then((data) => {
        setSquad(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllBatch()
      .then((data) => {
        setBatch(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <span className="font-bold text-md text-gray-700">Create New Data</span>
      <form onSubmit={formik.handleSubmit}>
        <div className="relative mb-4 flex w-full justify-between gap-2">
          <div className="w-full">
            <label htmlFor="gathering">Gathering</label>
            <select
              className="w-full py-3 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              name="gathering"
              onChange={formik.handleChange}
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
            <label htmlFor="data">Date</label>
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              name="date"
              type="date"
              placeholder="Date"
              value={formik.date}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="relative mb-4">
          <label htmlFor="description">
            Description <span className="text-red-500 text-sm">*</span>
          </label>
          <textarea
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            name="description"
            value={formik.description}
            onChange={formik.handleChange}
            placeholder="Description"
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
          </div>
        </div>
        <div className="relative mb-4 flex justify-between w-full gap-2">
          <div className="w-full">
            <label htmlFor="squad_id">Squad</label>
            <select
              className="w-full py-3 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              name="squad_id"
              onChange={formik.handleChange}
            >
              <option>Choose Squad</option>
              {squads.map((squad) => {
                return (
                  <>
                    <option value={squad.id} key={squad.id}>
                      {squad.squads_name}
                    </option>
                  </>
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
            >
              <option>Choose Batch</option>
              {batches.map((batch) => {
                return (
                  <>
                    <option value={batch.id} key={batch.id}>
                      {batch.batch_name}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
        </div>
        <div className="relative mb-2">
          <button
            type="submit"
            className="bg-blue-500 rounded py-2 px-3 text-white w-full"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormInput;
