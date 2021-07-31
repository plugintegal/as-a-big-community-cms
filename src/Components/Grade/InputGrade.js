import React, { useState, useEffect } from "react";
import { getDetailUserService, postGradeService } from "../../Services/";
import { useLocation,useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "../Parts/LoadingPage";
import { BiLoader } from "react-icons/bi";

const InputGradeComponent = () => {
  const history = useHistory();
  const location = useLocation();
  const userId = location.state.userId;
  const theoryId = location.state.theoryId;
  const [userDetail, setUserDetail] = useState({});
  const [loading, setLoading] = useState(false);
  

  const initialValues = {
    user_id: userId,
    grade: "",
    theory_id: theoryId,
    description: "",
  };

  const onSubmit = (values) => {
    setLoading(true)
    const newData = {
      ...values,
      squad_id : userDetail.squad_id,
      batch_id : userDetail.batch_id
    }
    postGradeService(newData)
    .then((data) => {
      if (data.status === 200) {
        localStorage.setItem("GRADE_SUCCESS", "SUCCESS");
        history.push({
          pathname : '/theory/pertemuan-ke-'+location.state.name,
          state : {
            Name: location.state.name,
            idTheory: theoryId,
          }
        });
        setLoading(false);
      }
    })
    .catch((error) => {
      alert("Terjadi kesalahan")
      setLoading(false);
    })
  };

  const validationSchema = Yup.object({
    grade: Yup.string().required("Required!"),
    description: Yup.string().required("Required!"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    getDetailUserService(userId)
      .then((data) => {
        console.log(data.data.data)
        setUserDetail(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
      // eslint-disable-next-line
  }, []);
  return (
    <>
      {userDetail &&
      // eslint-disable-next-line
      Object.keys(userDetail).length == 0 &&
      // eslint-disable-next-line
      userDetail.constructor == Object ? (
        <Loading />
      ) : (
        <>
          <div className="bg-gray-300 pt-6 pb-16 px-5 w-full">
            <div className="container mx-auto">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xl font-medium font-poppins mb-1">
                    PLUG-IN
                  </div>
                  <div className="text-sm">Grade</div>
                </div>
              </div>
            </div>
          </div>
          <div className="-mt-10 px-5">
            <div className="border bg-white rounded-md p-5 w-full h-auto">
              <form onSubmit={formik.handleSubmit}>
                <div className="relative mb-4">
                  <label htmlFor="grade">Grade (1-100)</label>
                  <input
                    type="number"
                    name="grade"
                    min="1"
                    max="100"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Enter Grade"
                    value={formik.grade}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.grade && formik.errors.grade ? (
                    <span className="text-red-500 text-sm">
                      {formik.errors.grade}
                    </span>
                  ) : null}
                </div>
                <div className="relative mb-4">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Enter description"
                    name="description"
                    value={formik.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <span className="text-red-500 text-sm">
                      {formik.errors.description}
                    </span>
                  ) : null}
                </div>
                <div className="relative mb-4">
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
      )}
    </>
  );
};

export default InputGradeComponent;
