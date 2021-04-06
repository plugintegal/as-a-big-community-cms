import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextArea from "react-validation/build/textarea";
import SelectInput from "react-validation/build/select";

import { getSquad, updateTheory, getTheoryById } from "../../../Services/";

const FormInputEdit = ({ theory_id }) => {
  const [squads, setSquad] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [theoryData, setTheoryData] = useState({
    gathering: "",
    description: "",
    date: "",
    squad_id: "",
    content: "",
  });
  const [filePath, setFilePath] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('gathering', theoryData.gathering);
    formData.append('description', theoryData.description);
    if(filePath.length !== 0){
      formData.append('content', filePath[0]);
    }
    formData.append('date', theoryData.date);
    formData.append('squad_id', theoryData.squad_id);
    
    updateTheory(formData, theory_id, currentUser.token)
    .then((data) => {
      console.log("BERHASIL");
    })
    .catch((error) => {
      console.log("ERROR ", error);
    })
  }

  const handleChange = (e) => {
    setTheoryData({...theoryData, [e.target.name] : e.target.value})
  }

  useEffect(() => {
    getSquad()
      .then((data) => {
        setSquad(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getTheoryById(theory_id).then((data) => {
      setTheoryData({
        gathering: data.data.data[0].gathering,
        description: data.data.data[0].description,
        date: data.data.data[0].date,
        squad_id: data.data.data[0].squad_id,
        content: data.data.data[0].content,
      });
    });
  }, []);
  return (
    <>
      <Form type="multipart/form-data" onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <label htmlFor="username">Gathering</label>
          <Input
            type="text"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
            placeholder="Enter gathering"
            name="gathering"
            value={theoryData.gathering}
            onChange={handleChange}
          />
        </div>
        <div className="relative mb-4">
          <div className="relative mb-2">
            <label htmlFor="description">Description</label>
            <TextArea
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Enter description"
              name="description"
              value={theoryData.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="relative mb-2">
          <label htmlFor="content">Konten</label>
          <div className="flex bg-grey-lighter gap-4">
            <label
              className="w-80 flex flex-col justify-center items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue hover:text-white"
              style={{ height: 200 }}
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">
                Select a new file
              </span>
              <Input
                type="file"
                className="hidden"
                name="content"
                onChange={(e) => setFilePath(e.target.files)}
              />
            </label>
            <div className="w-80 rounded-lg shadow-lg tracking-wide border border-blue-500">
              <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${theoryData.content}`}
                width="100%"
                height="200px"
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="relative mb-2">
          <label htmlFor="squad_id">Squad</label>
          <SelectInput
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            placeholder="Enter description"
            name="squad_id"
            value={theoryData.squad_id}
            onChange={handleChange}
          >
            <option value="">Pilih Squad</option>
            {squads.map((data) => {
              return (
                <option key={data.id} value={data.id}>
                  {data.squads_name}
                </option>
              );
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
            value={theoryData.date.slice(0, 10)}
            onChange={handleChange}
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
    </>
  );
};

export default FormInputEdit;
