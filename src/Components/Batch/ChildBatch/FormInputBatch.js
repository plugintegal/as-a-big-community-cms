import React from "react";

const FormInputBatch = ({ formik }) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="relative mb-4">
        <label htmlFor="username">Batch Name</label>
        <input
          type="text"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter squad name"
          name="batch_name"
          onChange={formik.handleChange}
          value={formik.values.batch_name}
          onBlur={formik.handleBlur}
        />
        {formik.touched.batch_name && formik.errors.batch_name ? (
          <span className="text-red-500 text-sm">
            {formik.errors.batch_name}
          </span>
        ) : null}
      </div>
      <div className="relative mb-4">
        <label htmlFor="username">Week Total</label>
        <input
          type="number"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter Week Total"
          min="0"
          name="week"
          onChange={formik.handleChange}
          value={formik.values.week}
          onBlur={formik.handleBlur}
        />
        {formik.touched.week && formik.errors.week ? (
          <span className="text-red-500 text-sm">
            {formik.errors.week}
          </span>
        ) : null}
      </div>
      <div className="relative">
        <button
          type="submit"
          className="bg-blue-500 text-white w-full rounded py-1"
        >
          Simpan
        </button>
      </div>
    </form>
  );
};
export default FormInputBatch;
