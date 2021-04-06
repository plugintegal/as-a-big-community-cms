import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";

import { signUpServices, getSquad } from '../../../Services/';

const FormCreate = () => {
  const [squads, setSquads] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    conf_password: "",
    roles: "",
    squad_id: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(userData)
    .then((data) => {
      console.log("BERHASIL");
    })
    .catch((error) => {
      console.log("ERROR ", error);
    })
  };

  useEffect(() => {
    getSquad()
      .then((data) => {
        setSquads(data.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <div className="relative mb-4">
        <label htmlFor="name">Name</label>
        <Input
          type="text"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter Name"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
      </div>
      <div className="relative mb-4">
        <label htmlFor="username">Username</label>
        <Input
          type="text"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter Username"
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
      </div>
      <div className="relative mb-4">
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
      </div>
      <div className="relative mb-4">
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter Password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
      </div>
      <div className="relative mb-4">
        <label htmlFor="conf_password">Confirm Password</label>
        <Input
          type="password"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter Confirm Password"
          name="conf_password"
          value={userData.conf_password}
          onChange={handleChange}
        />
      </div>
      <div className="relative mb-4">
        <label htmlFor="roles">Role</label>
        <Select
          className="w-full py-2 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter Confirm Password"
          name="roles"
          onChange={handleChange}
        >
          <option value="Admin">Admin</option>
          <option value="Mentor">Mentor</option>
          <option value="Bendahara">Bendahara</option>
        </Select>
      </div>
      <div className="relative mb-4">
        <label htmlFor="squad_id">Squad</label>
        <Select
          className="w-full py-2 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter Squad Password"
          name="squad_id"
          onChange={handleChange}
        >
          {squads.map((data) => {
            return <option value={data.id}>{data.squads_name}</option>;
          })}
        </Select>
      </div>
      <div className="relative mb-4">
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

export default FormCreate;
