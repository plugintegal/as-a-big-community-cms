import React from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextArea from "react-validation/build/textarea";

const FormInput = ({ onSubmit, onChange, squads }) => {
  console.log("SQUAD ", squads);
  return (
    <>
      <Form onSubmit={onSubmit}>
        <div className="relative mb-4">
          <label htmlFor="username">Squad Name</label>
          <Input
            type="text"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            placeholder="Enter squad name"
            name="squads_name"
            onChange={onChange}
            value={squads.squads_name}
          />
        </div>
        <div className="relative mb-2">
          <label htmlFor="description">Description</label>
          <TextArea
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            placeholder="Enter description"
            name="description"
            onChange={onChange}
            value={squads.description}
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
    </>
  );
};

export default FormInput;
