import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import { postBatch } from "../../../Services/batch.service";

const FormInputBatch = ({ setRefreshKey }) => {
  const [batchName, setBatchName] = useState("");
  const [weekBatch, setWeekBatch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    postBatch({batch_name : batchName, week : weekBatch})
    .then((data) => {
      console.log("BERHASIL");
      setBatchName("")
      setRefreshKey();
    })
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div className="relative mb-4">
        <label htmlFor="username">Batch Name</label>
        <Input
          type="text"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter squad name"
          name="batch_name"
          onChange={(e) => setBatchName(e.target.value)}
          value={batchName}
        />
      </div>
      <div className="relative mb-4">
        <label htmlFor="username">Week Total</label>
        <Input
          type="number"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter Week Total"
          min="0"
          name="week"
          onChange={(e) => setWeekBatch(e.target.value)}
          value={weekBatch}
        />
      </div>
      <div className="relative">
        <button
          type="submit"
          className="bg-blue-500 text-white w-full rounded py-1"
        >
          Simpan
        </button>
      </div>
    </Form>
  );
};

export default FormInputBatch;
