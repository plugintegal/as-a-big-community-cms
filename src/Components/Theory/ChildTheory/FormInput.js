import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextArea from "react-validation/build/textarea";
import SelectInput from "react-validation/build/select";

import squadServices from "../../../Services/squad.service";
import theoryServices from "../../../Services/theory.service";

const FormInput = () => {
  const [squads, setSquad] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);

  const [theoryData, setTheoryData] = useState({
    gathering: "",
    description: "",
    date: "",
    squad_id: 0,
  });

  const [filePath, setFilePath] = useState([]);

  const handleChange = (e) => {
    setTheoryData({ ...theoryData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { gathering, description, date, squad_id } = theoryData;
    console.log("FILE ", filePath[0]);
    const formData = new FormData();
    formData.append('gathering',theoryData.gathering);
    formData.append('description',theoryData.description);
    formData.append('content',filePath[0]);
    formData.append('date',theoryData.date);
    formData.append('squad_id', theoryData.squad_id);

    console.log("Form Data ",formData);

    theoryServices
      .postTheory(formData, currentUser.token)
      .then((data) => {
        console.log("BERHASIL");
      })
      .catch((err) => {
        console.log(err.response);
        console.log("Error");
      });
  };

  useEffect(() => {
    squadServices
      .getSquad()
      .then((data) => {
        setSquad(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  return (
    <Form onSubmit={handleSubmit} type="multipart/form-data">
      <div className="relative mb-4">
        <label htmlFor="username">Gathering</label>
        <Input
          type="text"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter gathering"
          name="gathering"
          onChange={handleChange}
          value={theoryData.gathering}
        />
      </div>
      <div className="relative mb-4">
        <div className="relative mb-2">
          <label htmlFor="description">Description</label>
          <TextArea
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            placeholder="Enter description"
            name="description"
            onChange={handleChange}
            value={theoryData.description}
          />
        </div>
      </div>
      <div className="relative mb-2">
        <label htmlFor="content">Konten</label>
        <div class="flex bg-grey-lighter">
          <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue hover:text-white">
            <svg
              class="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span class="mt-2 text-base leading-normal">Select a file</span>
            <Input
              type="file"
              class="hidden"
              name="content"
              onChange={(e) => setFilePath(e.target.files)}
              value={theoryData.content}
            />
          </label>
        </div>
      </div>
      <div className="relative mb-2">
        <label htmlFor="squad_id">Squad</label>
        <SelectInput
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter description"
          name="squad_id"
          onChange={handleChange}
        >
          <option value="">Pilih Squad</option>
          {squads.map((data) => {
            return <option value={data.id}>{data.squads_name}</option>;
          })}
        </SelectInput>
      </div>
      <div className="relative mb-2">
        <label htmlFor="content">Tanggal</label>
        <Input
          type="date"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter gathering"
          name="date"
          onChange={handleChange}
          value={theoryData.date}
        />
      </div>
      <div className="relative mb-2">
        <button
          type="submit"
          className="bg-blue-500 rounded py-2 px-3 text-white"
        >
          Simpan
        </button>
      </div>
    </Form>
  );
};

export default FormInput;
