import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import MDEditor from "@uiw/react-md-editor";
import { postTask } from "../../../Services/task.service";

const FormInputTask = ({ theory_id }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [taskData, setTaskData] = useState({
    title: "",
    deadline: "",
    theory_id: theory_id,
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTaskData = {
      ...taskData,
      content,
    };
    postTask(newTaskData, currentUser.token).then((data) => {
      if (data.status === 200) {
        console.log("Berhasil");
      }
    })
    .catch((error) => {
        console.log("ERROR ",error);
    })
  };
  return (
    <>
      <Form className="" onSubmit={handleSubmit}>
        <div className="container border bg-white rounded-md p-5 w-full h-auto mt-2">
          <div className="text-xl font-medium font-poppins mb-1">New Task</div>
          <div className="flex justify-center gap-4">
            <div className="relative mb-4 w-6/12">
              <label htmlFor="title">Title</label>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="Enter Title"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={taskData.title}
                onChange={handleChange}
              />
            </div>
            <div className="relative mb-4 w-6/12">
              <label htmlFor="deadline">Deadline</label>
              <Input
                type="date"
                id="deadline"
                name="deadline"
                placeholder="Enter deadline"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={handleChange}
              />
            </div>
          </div>
          <MDEditor
            height={300}
            value={content}
            name="content"
            onChange={setContent}
          />
          <button
            type="submit"
            className="bg-blue-500 w-full py-3 text-center mt-4 rounded text-white font-bold"
          >
            Save
          </button>
        </div>
      </Form>
    </>
  );
};

export default FormInputTask;
