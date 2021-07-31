import React, { useState } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import MDEditor from "@uiw/react-md-editor";
import { postTask } from "../../Services/";
import { BiLoader } from "react-icons/bi";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateNewTaskComponent = () => {
  const history = useHistory();
  const location = useLocation();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const initialValues = {
    title: "",
    deadline: "",
    theory_id: location.state.theoryId,
    content: "",
  };

  const onSubmit = (values) => {
    postTask(values, currentUser.token)
      .then((data) => {
        if (data.status === 200) {
          localStorage.setItem("TASK_SUCCESS", "SUCCESS");
          history.push({
            pathname : '/theory/pertemuan-ke-'+location.state.name,
            state : {
              Name: location.state.name,
              idTheory: location.state.theoryId,
            }
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error)
        alert("Terjadi kesalahan");
        setLoading(false);
      });
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required!"),
    deadline: Yup.string().required("Required!"),
    content: Yup.string().required("Required!"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const handleChangeContent = (value) => {
    setContent(value);
    formik.setFieldValue("content", value)
  };

  return (
    <>
      <div className="bg-gray-300 pt-6 pb-16 px-5 w-full">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xl font-medium font-poppins mb-1">
                PLUG-IN
              </div>
              <div className="text-sm">Create Task Page</div>
            </div>
            <div className="float right"></div>
          </div>
        </div>
      </div>
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-full h-auto">
          <form className="" onSubmit={formik.handleSubmit}>
            <div className="">
              <div className="text-xl font-medium font-poppins mb-3">
                New Task
              </div>
              <hr />
              <div className="flex justify-center gap-4">
                <div className="relative mb-4 w-6/12">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter Title"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={formik.title}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <span className="text-red-500 text-sm">
                      {formik.errors.title}
                    </span>
                  ) : null}
                </div>
                <div className="relative mb-4 w-6/12">
                  <label htmlFor="deadline">Deadline</label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    placeholder="Enter deadline"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={formik.deadline}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.deadline && formik.errors.deadline ? (
                    <span className="text-red-500 text-sm">
                      {formik.errors.deadline}
                    </span>
                  ) : null}
                </div>
              </div>
              <MDEditor
                height={300}
                name="content"
                value={content}
                onChange={handleChangeContent}
                onBlur={formik.handleBlur}
              />
              {formik.touched.content && formik.errors.content ? (
                <span className="text-red-500 text-sm">
                  {formik.errors.content}
                </span>
              ) : null}
              <button
                type="submit"
                className="bg-blue-500 w-full py-3 text-center mt-4 rounded text-white font-bold flex justify-center"
              >
                {loading ? (
                  <BiLoader className="text-white animate-spin text-xl" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default withRouter(CreateNewTaskComponent);
