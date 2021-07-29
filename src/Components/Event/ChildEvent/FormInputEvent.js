import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";
import moment from "moment-timezone";

import "react-datepicker/dist/react-datepicker.css";

import { BiCloudUpload, BiCheckCircle, BiLoader } from "react-icons/bi";
import {
  getAllCategoryEventService,
  postEventService,
} from "../../../Services";

const FormInputEvent = () => {
  const history = useHistory();
  const [filePath, setFilePath] = useState(null);
  const [categoryEvents, setCategoryEvents] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [fileError, setFileError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllCategoryEvent = () => {
    getAllCategoryEventService()
      .then((data) => {
        setCategoryEvents(data.data.data);
      })
      .catch((error) => {
        console.log("Error ", error.response);
      });
  };

  useEffect(() => {
    getAllCategoryEvent();
  }, []);

  const initialValues = {
    event_name: "",
    speaker: "",
    date_start: startDate,
    date_end: endDate,
    location: "",
    online_link: "",
    price: "",
    status: "",
    description: "",
    category_id: "",
  };

  const onSubmit = (values) => {
    setLoading(true)
    if (filePath == null) {
      setFileError("Required!");
    }
    const eventData = new FormData();
    eventData.append("event_name", values.event_name);
    eventData.append("speaker", values.speaker);
    eventData.append(
      "date_start",
      moment(startDate).tz("Asia/Jakarta").format("YYYY-MM-DD h:mm:ss")
    );
    eventData.append(
      "date_end",
      moment(endDate).tz("Asia/Jakarta").format("YYYY-MM-DD h:mm:ss")
    );
    eventData.append("location", values.location);
    eventData.append(
      "online_link",
      values.online_link === "" ? null : values.online_link
    );
    eventData.append("price", values.price.split(".").join(""));
    eventData.append("status", values.status);
    eventData.append("image_event", filePath[0]);
    eventData.append("description", values.description);
    eventData.append("category_id", values.category_id);

    postEventService(eventData)
      .then((data) => {
        if (data.status === 200) {
          localStorage.setItem("EVENT_SUCCESS", "SUCCESS");
          setLoading(false)
          history.push("/event");
        }
      })
      .catch((error) => {
        console.log("Error ", error.response);
        setLoading(false)
        alert("Something went wrong");
      });
  };

  const validationSchema = Yup.object({
    event_name: Yup.string().required("Required!"),
    speaker: Yup.string().required("Required!"),
    date_start: Yup.string().required("Required!"),
    date_end: Yup.string().required("Required!"),
    location: Yup.string().required("Required!"),
    price: Yup.string().required("Required!"),
    status: Yup.string().required("Required!"),
    description: Yup.string().required("Required!"),
    category_id: Yup.string().required("Required!"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="relative mb-3">
        <label htmlFor="event_name">Event Name</label>
        <input
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter name"
          name="event_name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.event_name}
          onBlur={formik.handleBlur}
        />
        {formik.touched.event_name && formik.errors.event_name ? (
          <span className="text-red-500 text-sm">
            {formik.errors.event_name}
          </span>
        ) : null}
      </div>
      <div className="relative mb-3">
        <label htmlFor="event_name">Speaker</label>
        <input
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter speaker name"
          name="speaker"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.speaker}
          onBlur={formik.handleBlur}
        />
        {formik.touched.speaker && formik.errors.speaker ? (
          <span className="text-red-500 text-sm">{formik.errors.speaker}</span>
        ) : null}
      </div>
      <div className="relative mb-3">
        <label htmlFor="location">Location</label>
        <textarea
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter Location"
          name="location"
          onChange={formik.handleChange}
          value={formik.values.location}
          onBlur={formik.handleBlur}
        ></textarea>
        {formik.touched.location && formik.errors.location ? (
          <span className="text-red-500 text-sm">{formik.errors.location}</span>
        ) : null}
      </div>
      <div className="w-10/12 flex gap-2 mb-3">
        <div className="w-full">
          <label htmlFor="date">Event Start Date</label>
          <DatePicker
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            name="date_start"
            showTimeSelect
            locale="id-ID"
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholder="Choose Date"
          />
          {formik.touched.date_start && formik.errors.date_start ? (
            <span className="text-red-500 text-sm">
              {formik.errors.date_start}
            </span>
          ) : null}
        </div>
        <div className="w-full">
          <label htmlFor="date">Event End Date</label>
          <DatePicker
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            name="date_end"
            locale="id-ID"
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholder="Choose Date"
          />
          {formik.touched.date_end && formik.errors.date_end ? (
            <span className="text-red-500 text-sm">
              {formik.errors.date_end}
            </span>
          ) : null}
        </div>
        <div className="w-full">
          <label htmlFor="date">Event Price (Rp)</label>
          <NumberFormat
            thousandSeparator="."
            decimalSeparator=","
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            placeholder="Enter price"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
            onBlur={formik.handleBlur}
          />
          {formik.touched.price && formik.errors.price ? (
            <span className="text-red-500 text-sm">{formik.errors.price}</span>
          ) : null}
        </div>
        <div className="w-full">
          <label htmlFor="status">Status</label>
          <select
            className="w-full bg-white rounded py-2.5 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            name="status"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          >
            <option>Choose Status</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
          {formik.touched.status && formik.errors.status ? (
            <span className="text-red-500 text-sm">{formik.errors.status}</span>
          ) : null}
        </div>
      </div>
      {formik.values.status === "Online" && (
        <div className="relative mb-4">
          <label htmlFor="online_link">Link</label>
          <input
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            placeholder="Enter link"
            name="online_link"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.online_link}
            onBlur={formik.handleBlur}
          />
        </div>
      )}
      <div className="relative mb-4">
        <label htmlFor="content">Event Image</label>
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
              onClick={() => setFileError(null)}
            />
          </label>
        </div>
        {/* TOLDEM */}
        {fileError != null ? (
          <span className="text-red-500 text-sm">{fileError}</span>
        ) : null}
      </div>
      <div className="relative mb-3">
        <label htmlFor="description">Description</label>
        <textarea
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter Description"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          onBlur={formik.handleBlur}
        ></textarea>
        {formik.touched.description && formik.errors.description ? (
          <span className="text-red-500 text-sm">
            {formik.errors.description}
          </span>
        ) : null}
      </div>
      <div className="relative mb-4">
        <label htmlFor="category_id">Category</label>
        <select
          className="w-full py-3 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          name="category_id"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option>Choose category</option>
          {categoryEvents.map((categoryEvent) => {
            return (
              <option key={categoryEvent.id} value={categoryEvent.id}>
                {categoryEvent.category_name}
              </option>
            );
          })}
        </select>
        {formik.touched.category_id && formik.errors.category_id ? (
          <span className="text-red-500 text-sm">
            {formik.errors.category_id}
          </span>
        ) : null}
      </div>

      <div className="w-full">
      <button
            type="submit"
            className="bg-blue-500 rounded py-2 px-3 text-white w-full flex justify-center"
          >
            {loading ? (
              <BiLoader className="text-white animate-spin text-xl" />
            ) : (
              "Submit"
            )}
          </button>
      </div>
    </form>
  );
};

export default FormInputEvent;
